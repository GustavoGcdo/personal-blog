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

o﻿ código html: 

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