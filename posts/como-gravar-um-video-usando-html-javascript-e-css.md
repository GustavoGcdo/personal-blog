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

Para gravar um vídeo vamos precisar de um objeto chamado **MediaRecorder** ele será o responsável por obter através do stream gerado da câmera pequenos pedaços que chamamos de ***chunks*** que iremos armazenar na memória e quando a gravação terminar juntaremos os *chunks* em um arquivo único no formato *Blob*