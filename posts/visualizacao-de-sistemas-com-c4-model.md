---
layout: post
publishedAt: 2023-07-26 11:32:12
image: /images/capa-2.png
title: Visualização de sistemas com C4 model
description: Nunca foi tão necessário criar uma boa documentação até você
  precisar de uma! Vamos explorar o modelo C4 para documentação de arquitetura
  de software e como ele pode simplificar alguns aspectos que antes eram
  difíceis de serem padronizados
---
## Introdução

“Software em funcionamento mais que documentação abrangente”, este é talvez um dos valores mais mal interpretados do manifesto desde que a metodologia ágil se tornou tão popular. Com tanta “velocidade” (ou pressa) para produzir sistemas acabamos utilizando esta frase como desculpa para não documentar ou não dar a devida importância a uma boa documentação.

A consequência disso, principalmente em arquitetura de software, está mais perto do que pensamos: falta de organização e padronização, desenvolvedores em ilhas de conhecimento, dificuldade de agregar novas pessoas e claro dificuldade de visualizar problemas que afetam não só o próprio desenvolvimento como também o negócio.

## C4 model para documentar e visualizar arquitetura de software

[Simon Brown](https://simonbrown.je/), o criador do modelo C4 Model conseguiu trazer de forma clara e objetiva uma forma de como podemos criar uma boa documentação de arquitetura. Um dos seus grandes pontos fortes na minha opinião é a facilidade de comunicar arquitetura em diferentes níveis de detalhes, conectando as diferentes partes interessadas, de dentro e também de fora do desenvolvimento, com o que realmente precisam e querem saber. Além disso, proporciona uma melhor integração de novas pessoas e ajuda tanto na análise quanto na avaliação da arquitetura vigente.

## Visualização em 4 níveis de abstração

C4 model, em geral, é dividido em 4 níveis de abstrações (os 4 Cs), cada um com seus respectivos público-alvos e recomendações. A ideia do criador é como se você estivesse ampliando um mapa e obtendo mais detalhes sobre determinado local. São eles:

1. Contexto
2. Container
3. Componente
4. Código

## Aprendendo na prática!

Para explicar e exemplificar cada um, vamos utilizar uma modelagem de um sistema de vendas simples. Assim espero ajudar você a aprender e quem sabe até usar este artigo como guia para criar os seus próprios diagramas.

### Nível de Contexto

Aqui está o começo de tudo. Estamos em uma visão de mais alto nível da arquitetura, então o foco aqui não está nos detalhes de tecnologia, e sim nas interações com personas e sistemas, sejam próprios ou externos.

![diagrama de contexto](/images/contexto.png "Diagrama de contexto")

**Público-alvo:** todos, técnicos e não técnicos, dentro e fora da equipe de desenvolvimento de software.

Conseguimos identificar de cara as principais personas (Cliente e Administrador), ambas interagindo com o sistema principal, que por sua vez tem duas dependências externas (Sistema de Pagamento e Sistema de Envio de E-mails). Essas informações, mesmo que aparentemente simples, já são relevantes para diversas tomadas de decisões de arquitetura, tais como: discutir qual serviço pode ser escolhido para o sistema de pagamento ou qual a expectativa de quantidade de acessos pelos clientes.

### Nível de Container

Ampliando a visão na caixa azul representando o sistema de vendas, chegamos no nível de container, e neste nível já podemos ver um pouco mais de detalhes. Aqui o foco é ter a visão de alto nível de como as responsabilidades do sistema serão divididas em unidades implantáveis e também como elas irão se comunicar. 

**Observação:** Não confunda com containers docker, por mais que coincidentemente a maioria das caixinhas pode se tornar um container docker, não é verdade que todos serão.

![diagrama de container](/images/container.png "Diagrama de container")

**Público-alvo:** pessoas técnicas dentro e fora da equipe de desenvolvimento de software; incluindo arquitetos de software, desenvolvedores e equipe de operações/suporte.

Focando no nosso exemplo, fica evidente que estamos nos preparando para uma carga de eventos que pode ser alta, e por isso o container para lidar com mensageria com seu próprio banco. Alguns podem até estar se perguntando: não seria melhor colocar um microsserviço para lidar com pedidos? e sim! E acredito que é justamente isso que essa visão nos proporciona, “visualizar” onde podemos melhorar ou simplificar dependendo do contexto de negócio e suas restrições. 

Fica simples visualizar como o sistema irá tomar forma e ainda comunicar isso com outras pessoas. Eu inclusive já utilizei essa visão para planejar uma implantação com o time de infraestrutura, e tudo ficou mais claro.

### Nível de Componentes

Escolhendo o container do backend para ampliarmos, podemos ver que aqui temos muito mais detalhes. Nesta visão, o foco é ver como o container é composto de vários componentes, cada um com suas responsabilidades e comunicações. Esses componentes podem ser um conjunto de classes, módulos e até mesmo um grupo de funções, contanto que consiga comunicar bem o que faz e por que está ali.

**\
Observação:** para fins de exemplo e a imagem não ficar tão carregada utilizei apenas os componentes referentes ao registro de pedido.

![diagrama de componentes](/images/componente.png "Diagrama de componentes")

**Público-alvo:** arquitetos e desenvolvedores de software.

Observando o exemplo, conseguimos ver o papel de cada componente, integrações e também ter uma boa ideia do fluxo que o dado (pedido no caso) irá passar. Mesmo sem nunca termos visto o sistema, fica evidente quais lugares devemos olhar se precisarmos de algo referente ao registro de pedido.

Como podemos ver, esse é um diagrama que pode ser bem mais frágil as mudanças devido à quantidade de detalhes, então, somente faça se ele agregar valor ao time ou projeto.

### Nível de Código

Por fim, chegamos ao último nível de “zoom”, agora ampliando algum componente para visualizar como ele é implementado. Podemos usar o diagrama de classe UML ou similares (Algumas IDEs geram este tipo de diagrama)

O próprio autor recomenda utilizar somente em componentes extremamente importantes ou complexos.

![diagrama de codigo](/images/codigo.png "Diagrama de codigo")

**Público-alvo:** arquitetos e desenvolvedores de software.

No exemplo ampliamos o componente “Registrar Pedido Use Case”, utilizei este diagrama para comunicar a inversão de dependências, objeto de retorno e uma possível exceção. Você pode acrescentar detalhamento, como nome de propriedades ou até mesmo com seus parâmetros caso precise. Confesso que, desde quando passei a usar o C4 model para documentar os sistemas onde trabalho, ainda não precisei chegar a este nível de detalhe. Mas mesmo assim, é válido tê-lo na caixa de ferramentas para quando for necessário discutir algo mais baixo nível ou entender um cenário complexo de uma implementação.

## Conclusão

Minhas experiências adotando o modelo C4 foram bastante positivas. Ele não só me ajudou na organização, nas estratégias e nas decisões relacionadas à arquitetura dos softwares, mas também se mostrou uma ferramenta valiosa de comunicação com outras equipes e pessoas não técnicas. Contudo, recomendo sempre analisar bem e utilizar o modelo de forma estratégica para agregar valor, escolhendo cuidadosamente os níveis de detalhes que o time e projeto precisam, bem como o público que consumirá as informações. Não faça apenas por fazer, pois só gerará burocracia e logo será abandonado.



## Links úteis

\- <https://c4model.com/> (O site oficial tem muita informação boa e clara além de ter várias dicas de ferramentas para criar os diagramas e outros diagramas, recomendo muito dar uma olhada)

\-﻿ <https://draw.io/> (Utilizei essa ferramenta para produzir os diagramas, é bem fácil de utilizar para exemplos mais simples)

\- <https://www.youtube.com/watch?v=f0Dp6Ob2guc> (Uma live top do Arquiteto das galáxias sobre o assunto)