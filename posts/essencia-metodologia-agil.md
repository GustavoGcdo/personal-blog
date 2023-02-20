---
title: 'A Essência da Metodologia Ágil'
description: 'Muitos acham que a agilidade é sobre fazer as coisas rapidamente. Mas não é. Nunca se tratou de fazer as coisas rapidamente. A metodologia ágil é saber, o mais cedo possível, o quanto estamos ferrados.'
publishedAt: '2022-02-11'
image: '/images/essencia-metodologia-agil/agil-kanban.jpg'
---

### Introdução

O assunto desenvolvimento Ágil para mim sempre foi muito controverso. Quanto mais estudava sobre o assunto ou conversava com outros desenvolvedores, mais tinha a impressão que na prática não funcionava muito bem. Os interesses em sua maioria pareciam estar em microgerenciar pessoas ou fazer entregas correndo sem dar tanta atenção a qualidade, isso não condizia com o que eu lia na literatura sobre ser “ágil”. Confesso que até já tentei aplicar na equipe que faço parte tempos atrás, mas não obtive sucesso, hoje sei que estava fazendo errado.

Foi a partir dessas experiências e pensamentos que me interessei e comprei o livro de Robert. C Martin: **Desenvolvimento Ágil Limpo - De volta às origens**. Sou um grande fã do autor e nada melhor para explicar o assunto a alguém que esteve lá no dia em que tudo começou. A leitura do livro foi muito esclarecedora e com certeza me fez refletir sobre o tema e seu verdadeiro propósito me inspirando em compartilhar com vocês o que aprendi.

### Primeiro de tudo: Manifesto Ágil

O manifesto é onde tudo começou, provavelmente você já deve ter visto por aí. Ele foi criado por volta dos anos 2001 em Snowbird onde várias pessoas importantes de diferentes processos se reuniram para conversar sobre processos leves. Dentre eles Kent Beck, o criador da XP e o próprio autor do livro em que me refiro chegaram a quatro princípios onde concentraram toda a essência da metodologia. São eles:

**Pessoas e interações**, mais que processos e ferramentas;

**Validação de software**, mais que documentação exaustiva e longa;

**Colaboração com o cliente**, mais que negociação de contratos;

**Resposta a mudanças**, mais que seguir um plano cegamente;

Podemos ver que os princípios aparentemente são simples, mas dentro de cada um existe um profundo conhecimento que tange várias áreas do software desde o desenvolvimento até o negócio.

O importante é notar que cada princípio está dividido em dois pontos: o lado esquerdo da vírgula nos mostra o que deveríamos dar mais atenção, contudo não exclui o lado direito, ambos são complementares. Por exemplo, ter uma boa validação de software é bom mas não significa que não se deve ter nenhuma documentação, responder a mudanças não exclui ter um planejamento e por aí vai.

### Não é sobre andar rápido, é sobre andar bem

“Muitos acham que a agilidade é sobre fazer as coisas rapidamente. Mas não é. Nunca se tratou de fazer as coisas rapidamente. A metodologia ágil é saber, o mais cedo possível, o quanto estamos ferrados.” Uncle Bob

Gostei tanto dessa frase do autor que coloquei na descrição desse post. Segundo ele, desenvolvimento ágil não é sobre andar rápido, mas sim andar bem, andar com consciência. É uma análise constante para boas tomadas de decisões de negócio, tudo isso aliado às boas práticas, com certeza, trarão os resultados esperados para o projeto.

Separei em alguns tópicos o que achei ser mais importante saber sobre a essência da metodologia ágil, como:

- Trabalhar de forma ágil é como correr uma maratona: não adianta disparar na largada e morrer no caminho, deve-se manter um ritmo sustentável.
- Agilidade nos possibilita gerar dados para que possamos tomar boas decisões, sejam elas técnicas ou de negócio. A através desses dados também vamos ser melhores em definir nossas estimativas e expectativas;
- Os ciclos de análise, estimativas, planejamento, implementação e feedback nunca acabam. A menos quando o cliente já está satisfeito com o que foi entregue, são esses ciclos curtos que vão nos ajudar na melhoria contínua e respostas a mudanças.
- Ser ágil é não abrir mão da qualidade, muito pelo contrário _“A única forma de avançar rápido é fazer as coisas bem feitas”_
- As entregas devem conter valor de negócio agregado. Por esse motivo os interessados devem participar dos ciclos ativamente e contribuir na priorização das funcionalidades.
- Profissionalismo,. Ambos os lados têm que assumir riscos e fazer o que deve ser feito. Devemos ser claros e exigentes no que estamos produzindo, pois isso pode e vai impactar a vida das pessoas.

#### Restrição tripla

Outro ponto que gostaria de destacar é sobre o gerenciamento da _restrição tripla_. Conhecer e saber lidar com ela, certamente irá nos dar mais consciência na tomada de decisões de nossos projetos.

Basicamente consiste em quatro interesses: **Bom, Rápido, barato e concluído,** nos quais você pode escolher apenas **três.**

Você pode querer que um projeto seja _bom, rápido e barato_ mas ele certamente não será **concluído;**
Ou então pode querer um projeto: bom, barato e concluído, porém ele não será **rápido**.

> 💡 Com base nos dados gerados durante os ciclos de entrega, as partes interessadas devem determinar o quão bom, rápido, barato e concluído o projeto será. Isso também é considerado quando são realizadas mudanças no escopo, no cronograma, na equipe e na qualidade.

### Relação com Extreme Programing (XP) e suas práticas

O autor destaca que uma das metodologias que mais representam os princípios do manifesto ágil em seus processos é a XP. No seu ciclo de vida e práticas recomendadas podemos ver uma forma mais aplicada a cada um dos princípios ágeis.

O ciclo de vida na XP está subdivido em três círculos, cada um representa uma area: o mais externo representa as práticas de negócio, o círculo do meio as práticas relacionadas a equipe e o mais interno as práticas técnicas.

![Ciclo de vida XP.svg](/images/essencia-metodologia-agil/Ciclo_de_vida_XP.svg)

#### Práticas de negócio:

- **Planejamento do jogo:** É a prática na qual serão divididas funcionalidades, histórias e tarefas. Nessa etapa, são decididas as estimativas e prioridades em relação ao cronograma.
- **Pequenas Versões:** orienta a equipe a trabalhar em pedaços pequenos do projeto
- **Testes de Aceitação:** É aqui onde se define como uma funcionalidade, história ou tarefa realmente está “concluída” (importante dizer que estamos falando do ponto de vista do usuário, não adianta “terminar” e o usuário não conseguir usar!)
- **Equipe como um todo:** Esta prática consiste em deixar claro os papéis e que todos estão trabalhando juntos para atingir o mesmo objetivo.

#### Práticas de equipe:

- **Ritmo Sustentável:** Busca por uma velocidade de equipe mais uniforme.
- **Propriedade coletiva:** Garantir com que a equipe toda tenha conhecimento sobre o projeto e não individualize o mesmo.
- **Integração Contínua:** Manter a equipe com foco em fechar o ciclo de feedback com frequência.
- **Uso de metáforas:** é a prática que cria e promove uma boa comunicação entre todas as partes interessadas.

#### Práticas técnicas:

- **Programação em dupla:** É a prática que promove o conhecimento compartilhado entre a equipe técnica, analisando e colaborando entre si.
- **Design Simples:** Esta prática guia a equipe para evitar desperdício de esforço.
- **Refatoração:** incentiva a melhoria contínua e o refinamento de todos os produtos de trabalho.
- **Desenvolvimento Orientado a Testes:** É a segurança que a equipe técnica usa com o objetivo de avançar rapidamente, mantendo a mais alta qualidade.

### Conclusão

Confesso que sempre que ouvia falar sobre esse assunto tinha um pé atrás. Muito era apenas aparência, no final , todo mundo ainda fazia gambiarras e trabalhava além das horas combinadas para entregar. Acredito que seja muito cedo para falar se estou totalmente errado, é preciso ter mais experiências na área. Ainda assim, posso dizer que através do que li, voltei a acreditar que é possível fazer algo bom, com qualidade e seguindo ciclos de melhoria contínua.

Sobre o livro, recomendo demais. Aliás, considero todos os livros de Robert C. Martin referências para qualquer desenvolvedor ou líder técnico. Fiquei curioso em saber mais sobre as práticas da XP, tenho certeza que vou atrás desse conhecimento.

Após a leitura e algumas análises me senti confiante, e estou tentando aplicar novamente na minha equipe, agora sim, com a visão e maneira correta. Adianto que já estou colhendo resultados bastante satisfatórios e talvez até faça um outro post para contar como tem sido minha experiência nessa jornada.
