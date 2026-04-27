---
layout: post
publishedAt: 2026-04-27 12:31:31
title: Como criar uma aplicação de videochamada usando WebRTC + Node + React
description: "Criar uma aplicação de videochamada parece, à primeira vista, algo
  extremamente complexo. E de fato existe bastante detalhe técnico envolvido.
  Mas a boa notícia é que, quando entendemos os princípios centrais do
  **WebRTC**, tudo começa a fazer sentido.  Neste artigo, vou explicar **como
  funciona a criação de uma aplicação de videochamada usando WebRTC**, usando
  este projeto como exemplo prático. A ideia não é só mostrar “o que o código
  faz”, mas explicar a lógica por trás da arquitetura: quem cria a sala, como os
  navegadores se encontram, como a mídia é transmitida e qual é o papel do
  backend em tudo isso."
---
# Como funciona uma aplicação de videochamada com WebRTC na prática

Criar uma aplicação de videochamada parece, à primeira vista, algo extremamente complexo. E de fato existe bastante detalhe técnico envolvido. Mas a boa notícia é que, quando entendemos os princípios centrais do **WebRTC**, tudo começa a fazer sentido.

Neste artigo, vou explicar **como funciona a criação de uma aplicação de videochamada usando WebRTC**, usando este projeto como exemplo prático. A ideia não é só mostrar “o que o código faz”, mas explicar a lógica por trás da arquitetura: quem cria a sala, como os navegadores se encontram, como a mídia é transmitida e qual é o papel do backend em tudo isso.

---

## A ideia mais importante: o backend não transmite o vídeo

Esse é o primeiro conceito que precisa ficar claro.

Em uma aplicação com WebRTC, normalmente o backend **não envia áudio e vídeo entre os usuários**. O papel dele é outro: ele atua como **servidor de sinalização**.

Na prática, isso significa:

- o **backend coordena a conexão**
- os **navegadores trocam informações iniciais**
- depois disso, o **áudio e o vídeo fluem diretamente entre os peers**, quando a rede permite

No projeto, isso fica bem evidente:

- **Frontend:** React + Vite
- **Backend:** NestJS
- **Sinalização:** Socket.IO
- **Mídia:** WebRTC no navegador

Essa separação é um dos princípios mais importantes de uma aplicação de videochamada.

---

## O que é sinalização em WebRTC

Antes de dois navegadores conseguirem trocar áudio e vídeo, eles precisam negociar a conexão. Essa negociação envolve três tipos principais de dados:

- `offer`
- `answer`
- `ice-candidate`

Esses dados não são a mídia em si. Eles são apenas mensagens que ajudam dois peers a combinar como vão se conectar.

No projeto, essa troca acontece pelo gateway do NestJS em:

`api/src/modules/signaling/signaling.gateway.ts`

Exemplo do repasse de uma `offer`:

```ts
@SubscribeMessage('webrtc-offer')
async handleWebRtcOffer(...) {
  this.server.to(dto.targetSocketId).emit('webrtc-offer', {
    fromSocketId: socket.id,
    offer: dto.offer,
  });
}
```

Repare no detalhe: o backend **só repassa** a mensagem para o destino correto. Isso é sinalização.

---

## O papel das salas na arquitetura

Antes da chamada começar, o sistema precisa organizar onde os participantes vão se encontrar. É aí que entram as **salas**.

No projeto, o fluxo começa pela criação de uma sala na `HomePage`:

`web/src/pages/HomePage.tsx`

```ts
const room = await createRoom(user?.name);
void navigate(`/room/${room.code}`, { state: { displayName: user?.name } });
```

Essa chamada vai para a API:

`web/src/services/roomsApi.ts`

```ts
const res = await fetch(`${BASE_URL}/rooms`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  body: JSON.stringify({ displayName: displayName?.trim() || 'Anônimo' }),
});
```

E o backend cria a sala em:

`api/src/modules/rooms/rooms.service.ts`

```ts
const room = this.roomsRepo.create(code, dto.displayName);
this.sessionsRepo.create(room.id);

return {
  roomId: room.id,
  code: room.code,
  url: `${frontendUrl}/room/${room.code}`,
};
```

Esse trecho mostra um princípio importante: **uma aplicação de chamada não é só WebRTC**. Ela também precisa de regras de domínio, como:

- criar sala
- validar sala
- controlar status
- saber quem entrou
- saber quando a chamada começou e terminou

Sem isso, a conexão até poderia existir, mas a aplicação não teria estrutura.

---

## Capturando câmera e microfone

Uma chamada de vídeo começa pela obtenção da mídia local. No navegador, isso é feito com `getUserMedia`.

Neste projeto, essa responsabilidade foi isolada no hook:

`web/src/hooks/useLocalMedia.ts`

```ts
mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
```

Esse código pede acesso à câmera e ao microfone. Se a câmera falhar, o projeto ainda tenta continuar apenas com áudio:

```ts
mediaStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
```

Esse detalhe é muito bom do ponto de vista de produto e arquitetura. Em aplicações reais, o cenário ideal nem sempre acontece. Usuários podem:

- negar permissão
- estar sem câmera
- ter o dispositivo bloqueado por outro app

Por isso, uma boa aplicação de videochamada precisa ser pensada para **degradar com elegância**, e não simplesmente falhar.

---

## O coração da conexão: RTCPeerConnection

A conexão WebRTC acontece por meio de um objeto chamado `RTCPeerConnection`.

No projeto, isso está em:

`web/src/hooks/useWebRTC.ts`

```ts
const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
```

O hook também define um servidor STUN:

```ts
const ICE_SERVERS: RTCIceServer[] = [{ urls: 'stun:stun.l.google.com:19302' }];
```

Esse ponto é essencial. Em redes reais, duas máquinas quase nunca conseguem se conectar diretamente sem ajuda. O servidor STUN ajuda cada peer a descobrir como pode ser alcançado pela rede.

Depois disso, as tracks locais são adicionadas à conexão:

```ts
localStream.getTracks().forEach((track) => {
  peerConnection.addTrack(track, localStream);
});
```

Sem adicionar essas tracks, não existe mídia sendo enviada. Esse é outro princípio importante: **a conexão existe separadamente da mídia**. Você cria a conexão e depois anexa o que quer transmitir.

---

## Como a negociação acontece na prática

Agora chegamos ao fluxo clássico do WebRTC.

### 1. Um usuário entra na sala

Quando o socket conecta, o frontend emite:

`web/src/hooks/useSignalingSocket.ts`

```ts
socket.emit('join-room', { roomCode, displayName });
```

O backend registra esse participante e avisa os demais:

```ts
socket.to(dto.roomCode).emit('user-joined', {
  socketId: socket.id,
  displayName: dto.displayName ?? null,
});
```

### 2. Quem já estava na sala cria a `offer`

Quando o frontend recebe `user-joined`, ele inicia a negociação:

`web/src/hooks/useWebRTC.ts`

```ts
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);
sendOfferRef.current(payload.socketId, offer);
```

A `offer` é basicamente a proposta de conexão.

### 3. O outro peer recebe e responde com `answer`

```ts
await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.offer));

const answer = await peerConnection.createAnswer();
await peerConnection.setLocalDescription(answer);
sendAnswerRef.current(payload.fromSocketId, answer);
```

### 4. O primeiro peer recebe a resposta

```ts
await pcRef.current.setRemoteDescription(new RTCSessionDescription(payload.answer));
```

Esse ciclo `offer -> answer` é a base da negociação WebRTC.

---

## Por que também precisamos de ICE candidates

Muita gente pensa que a chamada termina de ser configurada com `offer` e `answer`. Mas ainda falta uma parte crítica: a troca de candidatos de rede.

No projeto, isso acontece assim:

```ts
peerConnection.onicecandidate = (event) => {
  if (event.candidate && peerSocketIdRef.current) {
    sendIceCandidateRef.current(peerSocketIdRef.current, event.candidate.toJSON());
  }
};
```

O backend repassa:

```ts
this.server.to(dto.targetSocketId).emit('ice-candidate', {
  fromSocketId: socket.id,
  candidate: dto.candidate,
});
```

E o peer remoto adiciona esse candidato:

```ts
await pcRef.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
```

Esse processo existe porque os navegadores precisam descobrir **qual caminho de rede realmente funciona**. O WebRTC vai tentando possibilidades até achar uma rota viável.

Esse é um dos princípios mais importantes da tecnologia: a conexão é **descoberta progressivamente**, não montada de uma vez só.

---

## Como o vídeo remoto aparece na tela

Depois que a conexão é estabelecida e as tracks começam a chegar, o navegador dispara o evento `ontrack`.

No projeto:

```ts
peerConnection.ontrack = (event) => {
  const [stream] = event.streams;

  if (stream) {
    setRemoteStream(stream);
  }
};
```

Esse stream remoto é passado para o componente visual:

`web/src/components/VideoTile.tsx`

```ts
if (stream) {
  element.srcObject = stream;
}
```

Ou seja, o fluxo de exibição é bem limpo:

1. o WebRTC recebe a mídia
2. o hook atualiza o estado
3. o componente injeta o stream no elemento `<video>`

Essa separação é ótima porque mantém a lógica de conexão longe da camada visual.

---

## Controles de câmera e microfone

Uma chamada de vídeo não é só conectar. A aplicação também precisa permitir interações básicas, como:

- mutar microfone
- desligar câmera
- encerrar chamada

Neste projeto, o controle da câmera e do microfone não destrói a conexão. Ele apenas altera a propriedade `enabled` das tracks:

```ts
track.enabled = next;
```

Esse detalhe é importante. Em vez de renegociar tudo, o sistema simplesmente para ou retoma o envio daquela track. Isso é muito mais simples e eficiente para cenários básicos.

No componente `MediaControls`, a interface apenas dispara essas ações:

`web/src/components/MediaControls.tsx`

---

## O backend também controla regras de negócio

Embora o backend não transporte a mídia, ele ainda é muito importante. Ele garante a coerência da chamada.

No `SignalingGateway`, por exemplo, o projeto:

- valida os payloads com DTOs
- impede entrar em sala fechada
- limita a sala a 2 participantes
- define papéis (`host` e `participant`)
- fecha a sala quando o host sai

Exemplo:

```ts
const activeParticipants = this.participantsRepo.findActiveByRoomId(room.id);
if (activeParticipants.length >= MAX_PARTICIPANTS) {
  this.emitError(socket, 'Room is full');
  return;
}
```

Esse é um ótimo lembrete de arquitetura: **o WebRTC resolve a conectividade entre navegadores, mas não resolve sozinho o comportamento do produto**.

---

## O que este projeto ensina bem

Uma das melhores qualidades do código é a separação de responsabilidades no frontend:

- `useLocalMedia` cuida da captura da mídia
- `useSignalingSocket` cuida do canal de sinalização
- `useWebRTC` cuida da negociação P2P
- `VideoTile` cuida da renderização do vídeo
- `MediaControls` cuida das ações da interface

Essa divisão torna o projeto fácil de entender e é um bom padrão para evoluir a aplicação depois.

Se eu tivesse que resumir a principal lição do projeto, seria esta:

> uma aplicação de videochamada com WebRTC não começa pelo vídeo; ela começa pela organização do fluxo entre sala, sinalização, mídia e estado da conexão.

---

## Uma observação importante sobre esta PoC

O PRD menciona PostgreSQL para persistência, mas no estado atual do código isso está parcialmente implementado.

Hoje:

- **usuários** estão persistidos no banco
- **salas, participantes e sessões** estão em memória usando `Map`

Exemplo:

```ts
private readonly rooms = new Map<string, Room>();
```

Isso significa que esta é uma boa **PoC funcional**, mas ainda não uma arquitetura persistente para produção. Se o backend reiniciar, as salas e sessões desaparecem.

Esse tipo de decisão é comum em provas de conceito: primeiro valida-se o fluxo da chamada; depois se fortalece a persistência e a escalabilidade.

---

## Conclusão

WebRTC pode parecer complicado no início, mas seus princípios são bem claros quando observamos um projeto real:

- o backend faz a sinalização
- o navegador captura a mídia
- os peers negociam com `offer` e `answer`
- a conectividade real é resolvida com `ice-candidate`
- o vídeo remoto aparece via `ontrack`
- a aplicação precisa de regras de sala, estado e participantes

Este projeto é um bom exemplo porque mostra exatamente essa divisão. Ele não tenta esconder a complexidade, mas organiza o problema em partes compreensíveis.

E esse é, no fim das contas, o melhor caminho para construir uma aplicação de videochamada: **separar bem responsabilidades e entender que WebRTC é apenas uma parte da solução, não a solução inteira**.
