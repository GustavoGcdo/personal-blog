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