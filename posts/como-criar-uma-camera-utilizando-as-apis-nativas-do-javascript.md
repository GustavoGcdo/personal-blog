---
layout: post
publishedAt: 2023-08-25 07:32:33
image: /images/halide-camera-app-header-scaled.jpg
title: Como criar uma câmera utilizando javascript
description: Como construir um componente do zero que acessa sua câmera  e tira
  foto utilizando apenas as funcionalidades nativas do navegador
---
## Introdução

Recentemente tive que resolver um problema relacionado a uso de memória e uso de câmeras nativas com uma das aplicações web que dou manutenção e para resolver tive que partir para uma solução utilizando as apis do javascript.



## Contexto do problema

Temos uma aplicação web que precisa tirar várias fotos e gravar dois vídeos além de outras informações e isso tudo fica na memória do navegador até o usuário subir para o backend. O problema era que nesse meio tempo de tirar as fotos e abrir o aplicativo de câmera do próprio celular, o sistema operacional estava resetando o processo do navegador, limpando o que havia sido preenchido nos formulários junto com as imagens tiradas. 



## Solução

Após várias tentativas de otimização de memória e pesquisas na internet, encontrei alguém com o mesmo problema no stackoverflow e não foi animador:

<https://stackoverflow.com/questions/14274727/android-browser-refreshes-page-after-selecting-file-via-input-element>

![](https://lh4.googleusercontent.com/tS8RIzQToD2nqaRfdmxGnnDOh7jpjXYEWtt_8iZMIz6VKSric8oK9w9M-i15jHRYvHgx2jZGHLN7cXR8Ez1NxC-b17REOHn_9O8mihiHvto97IMDo5fuNLn6vChoWsWKratEqdY3Jv9tNkRwCZ13sN4)