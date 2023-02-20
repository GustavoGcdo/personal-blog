import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';

const AboutMe = `
Meu nome é Gustavo, moro na cidade de Campo Grande/MS, tenho 24 anos e sou casado com essa mulher maravilhosa do meu lado na foto. (sim sou um cara de sorte)

Atualmente curso Sistemas de Informação na UFMS enquanto trabalho em uma empresa de tecnologia, onde sou desenvolvedor Fullstack há 5 anos e também estou a frente da equipe de desenvolvimento.

Já estudei e trabalhei com diversas tecnologias dentre elas Java, SpringBoot, Spring MVC, C#, ASP.Net WebForms, ASP.Net MVC e neste momento a minha especialidade é com a stack Nodejs e Angular.

> Acredito que a programação tem poder para melhorar a qualidade de vida das pessoas, e que um bom desenvolvedor resolve problemas! Independente da stack utilizada.
`;

const About = () => {
  return (
    <Layout>
      <h1 className="text-5xl font-primary my-10 self-start mx-auto">Sobre mim</h1>

      <div className="grid md:gap-5 md:grid-cols-3 grid-cols-1">
        <div className="col-start-1 col-end-3 prose dark:prose-invert prose-lg prose-p:font-sans first-letter:max-w-none prose-h1:mt-10 prose-img:w-1/2 prose-img:mx-auto md:row-start-1 row-start-2">
          <ReactMarkdown>{AboutMe}</ReactMarkdown>
        </div>
        <div className="mx-auto relative w-full h-[250px] mb-10 row-start-1">
          <Image src="/images/profile.jpg" alt="image" layout="fill" objectFit="cover" />
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
  );
};

export default About;
