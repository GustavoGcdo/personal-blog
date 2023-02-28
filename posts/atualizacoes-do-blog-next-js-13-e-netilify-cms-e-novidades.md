---
layout: post
publishedAt: 2023-02-22 12:18:26
image: /images/banner-next-13.png
title: "Atualizações do blog: Next.js 13 e Netilify CMS e novidades!"
description: Voltando a escrever aqui no blog, e já começando com novidades!
  Testando as novas funcionalidades do Next.js 13 e também a mudança do CMS para
  uma plataforma mais simples. Confira o porquê das mudanças e qual os planos
  para o futuro.
---
## Introdução

Já faz um bom tempo que a plataforma heroku anunciou mudanças no plano gratuito [(mais detalhes aqui)](https://www.youtube.com/watch?v=8f9y6P5H7Go), quando soube nem liguei muito, mas agora que resolvi retomar com as atividades do blog decidi que teria que dar um jeito, pois era lá que estava hospedado o antigo CMS deste blog.

## Um pouco da história da criação do blog

Lembro-me que na época o objetivo era criar algo para poder compartilhar experiências pessoais e documentar meu aprendizado, então pensei: vou criar um blog! Com o blog eu poderia colocar em prática o que estava estudando e também ajudar alguém que esteja querendo aprender algo comigo.

Escolhi fazer o blog utilizando Next.js e para a gestão de conteúdo o strapi um headless CMS. O processo de desenvolvimento foi bem legal e aprendi muita coisa, porém depois que terminei fiquei pensando “será que precisava de toda essa arquitetura apenas para um blog simples?”. 

Claro que para um ambiente de testes e projeto pessoal era super válido, mas não sei se recomendaria criar toda essa estrutura, pelo menos não de início.

## Estrutura antes da atualização

Na antiga estrutura, o servidor do CMS ficava hospedado dentro do heroku junto com o banco de dados postgreSQL e o frontend em Next.js hospedado na vercel.

![diagrama com a estrutura anterior](/images/estrutura-antiga.png "Diagrama com a estrutura anterior")

Utilizando os recursos de geração estática do Next.js através das funções **getStaticProps** e **getStaticPaths** o frontend buscava os dados da api dos posts e dados que eram dinâmicos das páginas e gerava no build toda a parte estática necessária para que pudesse ser indexado pelos buscadores. 

O mais legal é que se o conteúdo muda o Next faz o fetch novamente para gerar as páginas conforme os novos dados e caso contrário ele os mantém como estavam.

E o que me deixou impressionado é que quando o serviço de banco de dados foi desligado do heroku e a api do strapi parou de funcionar, o blog continuou com as páginas normalmente sem quebrar por falta do conteúdo. 

Essa era uma stack muito boa, ferramentas que combinaram muito e que para um projeto maior, com mais pessoas mantendo seria com certeza uma boa escolha, inclusive utilizei em projetos onde trabalho, mas como comentei para um simples blog onde só eu atualizo não tinha essa necessidade. 

## Modificações e atualizações

A primeira e a mais importante modificação: precisava trocar o CMS.  Pesquisei e vi algumas alternativas, até que conheci o Netlify CMS pelo blog do Willian Justen [neste post aqui](https://willianjusten.com.br/usando-netlify-cms-com-nextjs-vercel-e-github) - inclusive recomendo muito o conteúdo desse cara -, gostei bastante de como ele funciona e iria suprir minhas necessidades.

![diagrama da estrutura nova](/images/estrutura-nova-cms.png "Diagrama da estrutura nova")

### Netlify CMS

Para quem não conhece o Netlify é um CMS que usa o git para gerenciar o conteúdo e esse conteúdo fica todo dentro do projeto, então não tem a necessidade um banco de dados ou servidor separado.

A configuração dentro do next é bem simples. Seguindo a [documentação](https://www.netlifycms.org/docs/add-to-your-site/) basta criar uma pasta onde ficará o cms   dentro do diretório `/public` e configurar dois arquivos `index.html` e `config.yml`. 

![estrutura de pastas para configurar o cms](/images/estrutura-pastas-cms-0.png "Estrutura de pastas para configurar o cms")

Dentro do arquivo `config.yml` é bem tranquilo configurar suas coleções de dados e seus respectivos campos, qual a pasta onde ele vai usar para colocar o conteúdo e mídias. Segue minha configuração:

```yaml
backend:
  name: github
  repo: GustavoGcdo/personal-blog
  branch: master
  squash_merges: true ## Estrategia de juntar todos commits em um quando publicar
  base_url: https://www.gustavooliveira.dev/
  auth_endpoint: api/auth/ ## Endpoint para autenticação com git

media_folder: "public/images"
public_folder: "/images"
publish_mode: editorial_workflow ## Habilitar modo workflow
slug:
  encoding: 'ascii'
  clean_accents: true

collections:
  - name: posts
    label: posts
    folder: posts 
    create: true 
    slug: '{{slug}}' 
    fields:
      - { label: 'Layout', name: 'layout', widget: 'hidden', default: 'post' }
      - { label: 'Date', name: 'publishedAt', widget: 'datetime', format: 'YYYY-MM-DD hh:mm:ss' }
      - { label: 'Post Image', name: 'image', widget: 'image', required: true }
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Description', name: 'description', widget: 'string' }
      - { label: 'Body', name: 'body', widget: 'markdown' }
```

Para autenticar usando a vercel/next seguir os seguintes passos: 

1. Certificar que na *config.yml* o *auth_endpoint* está configurado para`api/auth` (Conforme o arquivo acima)
2. Instalação do pacote [@openlab/vercel-netlify-cms-github](https://www.npmjs.com/package/@openlab/vercel-netlify-cms-github) e configuração dos arquivos `api/auth.ts` e `api/callback.ts`.

   ```typescript
   // src/pages/api/auth.ts
   export { auth as default } from '@openlab/vercel-netlify-cms-github'
   ```

   ```typescript
   // src/pages/api/callback.ts
   export { callback as default } from '@openlab/vercel-netlify-cms-github'
   ```
3. Configurar um “new OAuth App” para permitir autenticação dentro do github (<https://github.com/settings/developers>)

   ![Configuração do aplicativo OAuth github](/images/register-on-github.png "Configuração do aplicativo OAuth github")
4. Copiar as keys geradas e configurá-las como OAUTH_CLIENT_ID  e OAUTH_CLIENT_SECRET nas variáveis de ambiente da Vercel (Settings/Environment Variables). 

   ![Keys github](/images/github-keys.png "Keys github")

   ![Variáveis de ambiente na vercel](/images/env-vercel.png "Variáveis de ambiente na vercel")



Com isso configurado, é só logar no github e já terá acesso ao CMS.

Ainda nas configurações, o netilify também nos permite habilitar o *editorial_workflow*, um modo de publicação que utiliza dos pull requests para gerenciar em qual estágio está o seu conteúdo, no meu caso os posts.

Dessa forma é possível gerenciar visualmente o que está sendo feito e quando o conteúdo está pronto é só clicar em publicar que a branch do post é mergeada com a branch principal e estará disponível para deploy.

Dica: Publicando o projeto na Vercel ainda é possível ver uma versão com essas branchs antes de serem publicadas, conseguindo avaliar como ficaria em produção e também criar comentários.

### Next.js 13

A segunda atualização foi mais para experimentar algumas coisas da nova versão do Next.js 13, vi que tinha bastante coisa legal e que poderia ser aplicada e pensei: por que não?!.

A primeira coisa que fiz foi atualizar a versão do react.js para a 18. Logo em seguida atualizei a versão do Next.js para a última versão estável.

Ainda não tinha atualizado para usar o diretório src então também já aproveitei e fiz.

E dentro das novas funcionalidades adaptei:

* Next/font
* Next/image
* Next/link

\[colocar uma imagem do antes e depois de cada um]

## Conclusão

Experimentar e aprender novas tecnologias é sempre muito empolgante, eu particularmente gostei muito do resultado final e espero ter motivado vocês a continuarem um projeto ou até mesmo iniciar