import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';

const calcularIdade = () =>  {
  const hoje = new Date();
  const nascimento = new Date('1997-04-18');
  
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
  }

  return idade;
}

const AboutMe = `
Olá! Meu nome é Gustavo Candido de Oliveira, tenho ${calcularIdade()} anos e sou casado com essa mulher maravilhosa do meu lado na foto (sim sou um cara de sorte). 

Trabalho como desenvolvedor há mais de ${new Date().getFullYear() - 2016} anos. Ao longo da minha trajetória, atuei em projetos web, mobile e desktop. Embora tenha dedicado grande parte da minha carreira à stack JavaScript, que considero minha especialidade, nos últimos anos venho focando no desenvolvimento de APIs com Spring Boot e no mobile com Flutter.

Nos últimos anos, tenho atuado como líder técnico, contribuindo com a arquitetura de soluções, boas práticas de software, implantação de testes, processos de CI & CD, e treinamentos técnicos para a equipe.

> Acredito que a programação tem o poder de transformar vidas, e que um bom desenvolvedor é definido pela sua capacidade de resolver problemas, não pela stack que utiliza.
`;

const About = () => {
  return (
    <>
      <NextSeo
        title={'Sobre mim | Gustavo Oliveira'}
        description={'Um pouco mais sobre quem sou eu e o que faço.'}
        openGraph={{
          url: 'https://www.gustavooliveira.dev/about',
          title: 'Sobre mim | Gustavo Oliveira',
          description: 'Um pouco mais sobre quem sou eu e o que faço.',
          images: [
            {
              url: 'https://gustavooliveira.dev/images/share-site.png',
              alt: 'Logo Gustavo oliveira',
            },
          ],
        }}
      />

      <Layout>
        <h1 className="text-5xl font-primary my-10 self-start mx-auto">Sobre mim</h1>

        <div className="grid md:gap-5 md:grid-cols-3 grid-cols-1">
          <div className="col-start-1 col-end-3 prose dark:prose-invert prose-lg prose-p:font-sans first-letter:max-w-none prose-h1:mt-10 prose-img:w-1/2 prose-img:mx-auto md:row-start-1 row-start-2">
            <ReactMarkdown>{AboutMe}</ReactMarkdown>
          </div>
          <div className="mx-auto relative w-full h-[250px] mb-10 row-start-1">
            <Image src="/images/profile.jpg" alt="image" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <h1 className="text-5xl font-primary mt-10 mb-6 self-start mx-auto">Contato</h1>

        <p className="font-sans prose dark:prose-invert prose-lg mb-5">
          <span>Você pode entrar em contato comigo atravez do meu email: </span>
          <a href="#" className="font-bold">
            gustavo.gcdo@gmail.com
          </a>
          <span> ou das minhas redes sociais.</span>
        </p>

        <div className="flex flex-row gap-5">
          <a href="https://github.com/GustavoGcdo" target="_blank" rel="noreferrer">
            <svg
              className="h-8 w-8 dark:text-white text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/gustavogcdo/" target="_blank" rel="noreferrer">
            <svg
              className="h-8 w-8 dark:text-white text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />{' '}
              <rect x="2" y="9" width="4" height="12" /> <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </Layout>
    </>
  );
};

export default About;
