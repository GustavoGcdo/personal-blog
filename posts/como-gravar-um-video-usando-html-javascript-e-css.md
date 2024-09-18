---
layout: post
publishedAt: 2024-09-16 09:04:38
title: Como gravar um video usando html, javascript e CSS
description: Vamos aprender como implementar uma câmera e gravar pequenos videos
  usando html, javascript e css de forma simples
---
## I﻿ntrodução

Anteriormente fizemos uma câmera para poder tirar fotos usando o navegador, vamos agora evoluir a solução e gravar pequenos vídeos usando a mesma estrutura mais adicionando um novo recurso.

## Antes de começar!

I﻿remos utilizar como base o projeto de câmera feita no post anterior, ele é bem simples e caso você não tenha visto é só acessar aqui: **[Como criar uma câmera utilizando Javascript HTML5 e CSS3](https://www.gustavooliveira.dev/articles/como-criar-uma-camera-utilizando-javascript-html5-e-css3)**

V﻿imos no post anterior que a câmera é acessada pela api do navegador acessada pela função ***navigator.mediaDevices.getUserMedia*** e que ela só funciona em um contexto seguro, seja ele *localhost* ou usando *https* ([documentação oficial](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#privacy_and_security)) se atente a isso caso a sua câmera não esteja funcionando.

## Vamos ao trabalho

### P﻿asso 1: Ajustando o layout

B﻿asicamente a estrutura é a mesma, fiz apenas algumas alterações e adicionei alguns controles que uma câmera de vídeo precisa. A câmera aberta antes de gravar ficou assim: ⁣

![layout da camera de video usando html](/images/passo-1-layout.png "layout da camera de video usando html")

E﻿ quando está gravando:

![camera html enquanto grava o video](/images/passo-1-layout-gravando.png "camera html enquanto grava o video")

o﻿ código HTML: 

```html
 <div id="dialog-camera" class="absolute w-screen h-screen bg-stone-900 z-10 hidden">

        <div class="w-full h-full" id="video-preview-container">
          <video class="w-full h-full" autoplay id="video-preview"></video>

          <div id="timer" class="absolute bottom-20 w-fit mx-auto left-0 right-0 text-white z-10 hidden">00:00</div>
          <div
            class="absolute bottom-3 text-center z-10 grid grid-cols-3 p-2 justify-center place-items-center items-center w-full 
                      landscape:grid-rows-3  landscape:grid-cols-1 landscape:right-3 landscape:w-fit landscape:top-0 landscape:bottom-0">
            <i id="btn-close-dialog" class="fa-solid fa-xmark w-12 text-white text-3xl"></i>
            <i id="btn-recording"
              class="fa-solid fa-circle-dot text-[48px] w-12 rounded-full text-white bg-red-500 text-4xl "></i>
            <i id="btn-stop-recording"
              class="fa-solid fa-circle-stop text-[48px] w-12 rounded-full text-white bg-red-500 text-4xl hidden"></i>
            <i id="btn-toggle-camera" class="fa-solid fa-camera-rotate w-12 text-white text-3xl"></i>
          </div>
        </div>

        <div id="photo-preview-container" class="w-full h-full items-center justify-center hidden">
          <video class="w-full landscape:w-fit landscape:h-[75%]" controls id="video-preview-recorded"></video>
          <div id="actions-preview" class="absolute bottom-3 z-10 flex p-2 justify-around items-center w-full 
            landscape:flex-col-reverse landscape:right-3 landscape:w-fit landscape:top-0 landscape:bottom-0">
            <button id="btn-repeat" class="text-white px-3 py-2 ">Repetir</button>
            <button id="btn-ok" class="text-white px-3 py-2 ">OK</button>
          </div>
        </div>

      </div>
```

**Observação**: Estou mostrando somente o código alterado, caso queira acessar o código completo ***acesse aqui***

### P﻿asso 2: Recuperando elementos HTML e declaração das variáveis de controle

No início da minha tag *<script>* declarei as variáveis que serão utilizadas para recuperar os elementos referentes a câmera, os controles mais genéricos como botões de abrir/fechar a câmera e logo depois as minhas variáveis de controle que me ajudarão a manter o estado da câmera.

```javascript
  // recuperando elementos da camera de video
  const videoPreview = document.querySelector('#video-preview');
  const btnCamera = document.querySelector('#btn-recording');
  const btnStopCamera = document.querySelector('#btn-stop-recording');
  const videoPreviewContainer = document.querySelector('#video-preview-container');
  const photoPreviewContainer = document.querySelector('#photo-preview-container');
  const previewRecorded = document.querySelector('#video-preview-recorded');
  const timer = document.querySelector('#timer');
  
  // recuperando elementos de controle genericos
  const dialogCamera = document.querySelector('#dialog-camera');
  const btnToggleCamera = document.querySelector('#btn-toggle-camera');
  const btnOpenCamera = document.querySelector('#btn-open-camera');
  const btnCloseDialog = document.querySelector('#btn-close-dialog');
  const btnRepeat = document.querySelector('#btn-repeat');
  const btnOk = document.querySelector('#btn-ok');
  
  // declarando variaveis de controle
  let currentFacingMode = 'environment';
  let mediaRecorder;
  let streamCamera;
  let secondsElapsed = 0;
  let intervalId;
```

### P﻿asso 3: Iniciar/Pausar a câmera

I﻿niciar a câmera é exatamente igual para quando vamos fazer uma câmera apenas para tirar uma foto. Primeiro declaramos uma função que será responsável por chamar a api *getUserMedia* do navegador que caso obtenha sucesso irá retornar um stream no qual vamos direcionar para um objeto de vídeo e também iremos salvar este stream nas nossas variáveis de controle, pois iremos usar tanto para a gravação quanto para parar a câmera quando não estivermos usando.

```javascript
  const startCamera = (facingMode = 'environment') => {
    stopCamera();
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        width: {
          max: 1980,
          ideal: 1024
        },
        height: {
          max: 1080,
          ideal: 768
        }
      }
    }).then((stream) => {
      videoPreview.srcObject = stream;
      streamCamera = stream;
    })
  }
 
```

**L﻿inha 17:** Note que estamos usando a variável ***streamCamera*** anteriormente declarada para armazenar o stream.

P﻿ara parar a câmera usaremos o stream do vídeo e percorremos cada track chamando o método ***stop*** de cada uma.

```javascript
 const stopCamera = () => {
    if (videoPreview.srcObject) {
      const stream = videoPreview.srcObject;
      const tracks = stream.getTracks().forEach((track) => track.stop());
    }
  }
```

U﻿samos o método ***startCamera*** sempre que usuário abre a câmera pela primeira vez ou quando ele precisa trocar o modo câmera frontal ou traseira. Como mostra as funções a seguir:

```javascript
  btnOpenCamera.addEventListener('click', () => {
    dialogCamera.classList.toggle('hidden');
    photoPreviewContainer.classList.add('hidden');
    videoPreviewContainer.classList.remove('hidden');

    startCamera(currentFacingMode);
  });

  btnToggleCamera.addEventListener('click', () => {
    if (currentFacingMode == 'environment') {
      currentFacingMode = 'user';
    } else {
      currentFacingMode = 'environment'
    }

    startCamera(currentFacingMode);
  })
```

### P﻿asso 4: Gravar um vídeo

Para gravar um vídeo vamos precisar de um objeto chamado **MediaRecorder** ele será o responsável por obter através do stream gerado da câmera pequenos pedaços que chamamos de ***chunks*** que iremos armazenar na memória e quando a gravação terminar juntaremos os *chunks* em um arquivo único no formato *Blob.* 

Para isso acontecer de forma organizada vamos criar algumas funções para separar cada responsabilidade deste processo.

```javascript
const startRecording = () => {
    btnCamera.classList.toggle('hidden');
    btnStopCamera.classList.toggle('hidden');
    btnToggleCamera.classList.toggle('hidden');
    timer.classList.toggle('hidden');
    secondsElapsed = 0;

    mediaRecorder = new MediaRecorder(streamCamera, {
      mimeType: 'video/webm;codecs=vp8'
    });

    const chunks = [];
    mediaRecorder.ondataavailable = (event) => {      
      chunks.push(event.data);
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      const urlPreview = URL.createObjectURL(blob);
      previewRecorded.src = urlPreview;

      photoPreviewContainer.classList.replace('hidden', 'flex');
      videoPreviewContainer.classList.toggle('hidden');

      mediaRecorder = null;
      stopTimer();
    }

    const CHUNK_SIZE = 1000; // 1 seg
    mediaRecorder.start(CHUNK_SIZE);
    startTimer();
  }
```

A﻿ função principal é a **startRecording** vamos observar cada parte para entender o que está acontecendo.

**L﻿inhas 2-5**: Estamos removendo da tela o botão de gravação e de troca de câmera (já que durante a gravação não é permitido trocar entre as câmeras)

**L﻿inha 6**: Estamos zerando o contador do vídeo.

**L﻿inhas 8-10**: Instanciamos um novo objeto **MediaRecorder** passando o **streamCamera** (nosso stream que está inicializado) e o parâmetro de gravação ***mimeType*** para que ele saiba que é um vídeo e qual codec de gravação. 

**L﻿inhas 12-15**: Declaramos um array para armazenar os pedaços do video (*chunks*) e na função logo após estamos adicionando ao array conforme recebemos os pedaços pelo callback ***ondataavailable*** do objeto **mediaRecorder**.

**L﻿inhas 17-27**: Aqui estamos tratando quando a gravação for parada pelo usuário que é escutada a partir do callback **onstop**. 

Na ***linha 18*** pegamos os chunks e passamos para uma nova instância do objeto Blob com o parâmetro de *video/mp4* que será o formato de saída do vídeo, já na **linha 19** geramos uma URL local para podermos mostrar na pré-visualização do vídeo setado na **linha 20**.

Em sequência estamos:

\- Habilitando o preview do vídeo gravado (linha 22);

\- Escondendo a câmera (linha 23);

\- Zerando o objeto mediaRecorder (linha 25);

\- Parando o timer (linha 26).

**L﻿inhas 29-31:** Definimos o tamanho do *chunk* em 1 segundo, iniciamos a gravação juntamente com o timer.

A﻿ função que chama o ***startRecording*** é essa:

```javascript
 btnCamera.addEventListener('click', () => {
    startRecording();
  });
```

P﻿ara parar de gravar o vídeo iremos usar a função: 

```javascript
const stopRecording = () => {
    streamCamera.getTracks().forEach((track) => track.stop());
    mediaRecorder.stop();
  }
```

E iremos chamar a função no clique do botão de stop:

```javascript
  btnStopCamera.addEventListener('click', () => {
    stopRecording();
  })
```

#### Funções que manipulam o timer (iniciar, formatar e parar)

**Observação:** Estas são apenas funções genéricas geradas pelo chatGPT para formatar os segundos passados no formato 00:00 e atualizar o texto da div do timer.

```javascript
  const formatTime = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  const startTimer = () => {
    intervalId = setInterval(() => {
      secondsElapsed++;
      timer.textContent = formatTime(secondsElapsed);
    }, 1000);
  }

  const stopTimer = () => {
    timer.textContent = '00:00';
    clearInterval(intervalId);
  }
```

A﻿pós gravar se deu tudo certo, a tela ficará assim:

![Pré-visualização do video gravado](/images/apos-gravacao.png "Pré-visualização do video gravado")

#### F﻿unções utilizadas para manipular a tela e resetar os controles

```javascript
 resetControls = () => {
    btnCamera.classList.remove('hidden');
    btnStopCamera.classList.add('hidden');
    btnToggleCamera.classList.remove('hidden');

    timer.classList.add('hidden');
    secondsElapsed = 0;
    stopTimer();
  }
 
 btnCloseDialog.addEventListener('click', () => {
    dialogCamera.classList.toggle('hidden');

    resetControls();
    stopCamera();
  });

  btnRepeat.addEventListener('click', () => {
    previewRecorded.src = '';

    photoPreviewContainer.classList.replace('flex', 'hidden');
    videoPreviewContainer.classList.toggle('hidden');

    resetControls();
    startCamera();
  });

  btnOk.addEventListener('click', () => {
    dialogCamera.classList.toggle('hidden');
    photoPreviewContainer.classList.replace('flex', 'hidden');
    videoPreviewContainer.classList.toggle('hidden');

    resetControls();
    stopCamera();
  });
```

**D﻿ICA:** É﻿ muito impotante que você pare a utilização da camera quando não estiver utilizando para evitar que sua aplicação use muita memória ou tenha problemas futuros ao tentar abrir uma camera que ficou aberta por engano. Por isso chamamos o **stopCamera** nas **linhas 34 e 15** 

### Código-fonte

T﻿odo código-fonte tanto deste exemplo quanto do tutorial anterior se encontra neste repositório [github](https://github.com/GustavoGcdo/camera-with-js)



### Conclusão

Antes de finalizar gostaria de agradecer o contato da Michelle Corrêa que sua dúvida resultou na criação deste post. E﻿spero ter ajudado a construir esta solução e aprendido um pouco sobre como funciona a gravação de vídeos usando recursos do navegador. 

Caso tenham dúvidas podem deixar nos comentários aqui em baixo ou me mandar em um dos meus contatos deixados na página [sobre mim](https://www.gustavooliveira.dev/about).