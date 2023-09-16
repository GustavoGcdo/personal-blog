---
layout: post
publishedAt: 2023-08-25 07:32:33
image: /images/halide-camera-app-header-scaled.jpg
title: Como criar uma câmera utilizando javascript
description: Como construir um componente do zero que acessa sua câmera  e tira
  foto utilizando apenas as funcionalidades nativas do navegador
---
## Introdução

Recentemente precisei implementar uma câmera na web utilizando as apis nativas do javascript para resolver um problema relacionado ao conflito do uso de memória com câmeras nativas e o navegador onde estava sendo executado a aplicação.

## Contexto do problema

Temos uma aplicação web que em uma das suas principais funcionalidades era tirar várias fotos e gravar vídeos além de coletar outras informações de texto e como toda aplicação client side isso tudo fica na memória do navegador até o usuário subir para o backend. 

Mas o problema era que no tempo de tirar as fotos e abrir o aplicativo de câmera do próprio celular, o sistema operacional estava resetando o processo do navegador, limpando o que havia sido preenchido nos formulários com as imagens tiradas. 

Após várias tentativas de otimização de memória e pesquisas na internet, encontrei alguém com o mesmo problema no stackoverflow e não foi nada animador.



> [L﻿ink](https://stackoverflow.com/questions/14274727/android-browser-refreshes-page-after-selecting-file-via-input-element) para a discussão original



![](https://lh5.googleusercontent.com/jzQ-NJDqdRDodIi6ZOnf0wqIWOoic_GIa_lXg3PiZoshJldOgdNi1NYyIsLtuIdImx2fJgJHV0aCouG8CRNVTBZ6J2BH731JfODUXIIt-pl-lRcQE9DNrnzO_6qvtPuk3ZVd3PLS28baJyPkq1iGXBI)

## Solução

Como eu precisava trazer uma solução em um curto prazo, eu não poderia sugerir que tínhamos que refazer toda a solução web para nativa então decidi usar javascript, html e css para criar uma câmera na web evitando assim que o usuário saísse da aplicação, ganhando um pouco de tempo para planejar uma solução definitiva.

## Mãos à obra

Agora que já temos um contexto e uma motivação, bora ver como ficou a implementação dessa câmera passo a passo. 

Ferramentas utilizadas:

* HTML, CSS, Javascript
* TailwindCSS (Para facilitar a estilização)
* Font-awesome (Para os ícones da câmera)

Optei por utilizar essas ferramentas no exemplo para focar mais na funcionalidade, assim você pode utilizar este exemplo e transportar para qualquer outro framework como React, Angular ou Vue.js.

## Passo 1: Layout da câmera

Tentei reproduzir o mais próximo a uma câmera de celular padrão. O resultado ficou assim:

![preview do layout da camera](/images/passo-1-1.png "Preview do layout da camera")

O código html:

![código html com a estrutura básica da camera](/images/passo-1.png "Código html com a estrutura básica da camera")

Explicações importantes

**Linha 34:** div que irá conter o preview da câmera e suas ações;

**Linha 35:** tag de vídeo que será utilizado para mostrar o que a câmera está captando.

**Linha 36:** tag canvas que será responsável por tirar um “snapshot” da pré-visualização do vídeo, no nosso caso vai servir para nossa foto.

**Linha 45:** div que agrupa os elementos que serão utilizados para visualizar a foto tirada e suas ações.

**Linha 48-49:** tag de imagem que será responsável por mostrar a imagem tirada. É importante acrescentar o atributo ***'crossorigin="anonymous"'***, pois o resultado do snapshot será uma url criada a partir de um Blob que talvez o navegador não conheça e impeça de ser usada.

## Passo 2: Pré-Visualizar a câmera

![código javascript com a função de start para a camera](/images/passo-2.png "Código javascript com a função de start para a camera")

Para pré-visualizar a câmera é preciso pedir a permissão ao usuário, fazemos isso através do método ***navigator.mediaDevices.getUserMedia (linha 73)*** que já recebe por parâmetro as configurações que vamos usar na câmera.

Descrição dos parâmetros que estamos usando:

**video.facingMode**: tipo de câmera ‘user’ para frontal ou ‘environment’ para as outras câmeras;

**video.width** e **video.height**: resolução do vídeo altura e largura (aceita ideal, max, min);

> Todas as propriedades podem ser encontradas na documentação oficial [aqui](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

Após a permissão concedida, a promise do método getUserMedia retorna um objeto stream que configuramos como fonte para o elemento de vídeo, mostrando o assim preview da câmera. (linha 86). 

Não podemos esquecer de chamar o método startCamera (linha 90) logo após para que tudo isso possa acontecer.

## Passo 3: Tirar uma foto

![](/images/passo-3.png)

**Linha 92-96**: Recuperamos os elementos que iremos manipular para tirar a foto (btnCamera, canvas), ocultar o preview da câmera (videoPreviewContainer) e mostrar a foto tirada (photoPreviewContainer, photoPreview).

**Linha 98:** Definimos o método que irá tirar o snapshot quando o botão camera for clicado. Dentro do método:

* Definimos o tamanho da foto que será gerada a partir do tamanho do vídeo (linhas 99 e 100).
* Configuramos o contexto 2d para o objeto canvas (linha 101)
* Capturamos o momento do vídeoPreview desenhando ele no canvas (linha 103)
* Convertemos o resultado em um objeto Blob (linha 105)
* Criamos uma url a partir do objeto blob e configuramos no preview da foto (linha 106)
* Ocultamos o preview da câmera e habilitamos o preview da foto (linhas 107 e 108)

## Passo 4: Troca entre as câmeras

![código javascript para troca entre as cameras](/images/passo-4.png "Código javascript para troca entre as cameras")