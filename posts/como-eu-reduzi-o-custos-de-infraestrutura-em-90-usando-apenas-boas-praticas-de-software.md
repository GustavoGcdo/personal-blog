---
layout: post
publishedAt: 2025-12-23 11:10:42
image: /images/ash-integrated-services-exploring-the-strategic-benefits-of-integrated-mechanical-and-electrical-engineering-for-the-residential-care-industry.2.png
title: Como reduzi os custos de infraestrutura em 90% usando apenas boas
  práticas de software
description: Um cliente me procurou porque a conta do Firebase passou dos R$ 11
  mil por mês — e ninguém sabia exatamente por quê
---
## Introdução

A aplicação consistia em vendas de ingressos esportivos e estava utilizando a infraestrutura do Google: Firebase, Firestore (Banco de dados principal), Cloud Functions e Storage 
e o frontend/backend na Vercel com Next.js (Edge Functions e server components).

Ninguém sabia exatamente o porquê, mas o custo era alto e estava aumentando consideravelmente em pouco tempo. Parte da equipe já tentava reduzir este custo, mas algumas propostas estavam se baseando em adicionar componentes de arquitetura — como implementar um sistema de cache distribuído com Redis — sem validar, na minha visão, o problema central.

Minha abordagem foi diferente: entender a arquitetura e a aplicação mais a fundo, encontrar, medir e corrigir erros antes de adicionar mais complexidade.

N﻿este post vou explicar como eu encontrei o gargalo de custo e como cheguei no resultado mostrado na imagem abaixo

![Comparativo dos resumos de faturamento do firebase antes e depois da redução de custo](/images/frame-5-2-.png "Comparativo dos resumos de faturamento do firebase antes e depois da redução de custo")

## Primeiro passo: análise da arquitetura

Para entender o que estava acontecendo, comecei mapeando:

* A arquitetura (system design) da aplicação;
* Principais funcionalidades;
* Fluxos mais acessados;
* Relatórios das queries;
* Padrões da aplicação e códigos.

Como eu não conhecia a plataforma a fundo e precisava ser rápido, procurei inicialmente por gargalos óbvios. Fiz algumas melhorias, mas o impacto ainda não foi tão significativo quanto eu gostaria.\
Ficou claro que havia algo mais profundo acontecendo.

## Investigando utilização × custos

Com cerca de **11 mil usuários diários**, era esperado um volume moderado de queries.\
Porém, o painel de métricas mostrava consultas sendo executadas em uma escala completamente fora do normal — milhares de queries diariamente.

E o que tornava isso mais estranho: observando o relatório de custos, o maior gasto **não era a quantidade de queries**, mas sim o **tráfego de dados (egress)**, equivalente a **95% do total**.

Isso indicava que havia um problema sério nessas consultas. Além de serem muitas, traziam **muitos dados**.\
E a grande pergunta era:

> **Será que todos esses dados estavam realmente sendo utilizados?**

## O ponto crítico: o catálogo público

Ao rastrear as queries mais caras, cheguei à principal funcionalidade do sistema: um **catálogo público**, onde cards listam informações para que os usuários visualizem os produtos — bem semelhante a um catálogo comum com imagem e dados básicos.

E foi aí que encontrei o caos:

* A principal query era chamada **mais de 8 vezes por renderização**, gerando um volume desnecessário de consultas.
* Não havia uso de `select`: todos os atributos da coleção eram retornados, embora os cards usassem apenas alguns.
* Entre esses atributos existiam **imagens em Base64**, algo que nunca deveria estar salvo em um banco como o Firestore.
* Componentes duplicavam consultas já realizadas, misturando `fetch` com React Query e estados locais.
* Não havia paginação nem filtros no backend: tudo era filtrado no frontend.

Em resumo: **muitos dados, muitas vezes, sem necessidade**.

## Solução: reconstruir a tela com engenharia, não gambiarra

### Remodelagem da consulta

Reescrevi a query utilizando um `where` mais restrito e com `select`, trazendo somente os atributos necessários para os cards.\
Removi completamente o Base64, que além de ser um problema, nem estava sendo utilizado.

```javascript
// Exemplo de consulta no firebase usando select + dbadmin.
const snapshot = await dbAdmin
      .collection(collectionName)
      .where('display', '==', true)
      .select(
        'name',
        'eventUrl',
        'eventCategory',
        'city',
        'state',
        'organizerName',
        'initialDate',
        'finalDate',
        'finished',
        'eventDay',
        'eventMounth',
        'hour',
        'display',
      )
      .get();
```



### Refatoração dos componentes

Os cards passaram a exibir exclusivamente os dados vindos da query da tela, apenas uma vez.\
Eles deixaram de fazer requests internas, evitando mistura de responsabilidades.\
Com isso, a tela ficou mais simples, mais leve e muito mais fácil de manter.

### Padronização do acesso aos dados e cache

Na tela principal, além de termos agora uma fonte única de dados, também padronizei o uso do `fetch`, recomendado pelo Next.js, incluindo seu sistema de cache nativo.\
Esse cache ajudou a reduzir chamadas repetidas de requisições idênticas.

```javascript
// Exemplo de chamada utilizando fetch + cache do next
const resHome = await fetch('api/eventos', { next: { revalidate: 300 } });

```

Com o tempo, ficou evidente que houve uma degradação daquela tela e da forma como o código tinha sido escrito — inclusive muito código gerado por IA sem revisão.\
Sei que muitas vezes temos pressa para implementar, e a pressão por entregas rápidas acontece. Mas, nesse caso, a falta de boas práticas e de um código manutenível custou **muito dinheiro**.

## Resultado: economia imediata

**Antes da refatoração:** R$ 300 por dia\
**Depois da refatoração:** R$ 29–30 por dia

![Relatorio mostrando o custo diário reduzido de um dia R$ 300 para o outro R$ 28](/images/screenshot_3.png "Relatorio mostrando o custo diário reduzido de um dia para o outro")

Uma redução acima de **90%**, sem mudar nenhuma funcionalidade da aplicação e sem adicionar novos componentes à arquitetura — apenas escrevendo o software da maneira correta.

Além da economia, o sistema ficou mais rápido e mais fácil de manter.

## Conclusão

Confesso que foi muito gratificante ver o gráfico de custos despencando. Ali estava registrado que a qualidade que busco entregar no meu trabalho não é para enfeitar ou para gerar “códigos bonitos”.\
**Qualidade é um requisito que impacta diretamente o financeiro de uma solução.**

Aplicar engenharia e usar boas práticas será sempre um excelente investimento, permitindo que sua solução cresça de maneira saudável — não apenas reduzindo custos, mas também suportando atualizações e novas oportunidades de mercado.