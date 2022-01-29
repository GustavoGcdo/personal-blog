import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';

const About = ({ aboutMe }: any) => {
  return (
    <Layout>
      <h1 className="text-5xl font-primary my-10 self-start mx-auto">Sobre mim</h1>

      <div className="grid gap-5 md:grid-cols-3 grid-cols-1">
        <div className="col-start-1 col-end-3 prose prose-lg prose-p:font-sans max-w-none prose-h1:mt-10 prose-img:w-1/2 prose-img:mx-auto md:row-start-1 row-start-2">
          <ReactMarkdown>{aboutMe.attributes.content}</ReactMarkdown>
        </div>
        <div className="mx-auto relative w-full h-[250px] mb-10 row-start-1">
          <Image
            src={getStrapiMedia(aboutMe.attributes.img_perfil)}
            alt="image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <h1 className="text-5xl font-primary mt-10 mb-6 self-start mx-auto">Contato</h1>

      <p className="font-sans prose prose-lg mb-5">
        Você pode entrar em contato comigo atravez do meu email:{' '}
        <a href="#" className="font-bold">
          gustavo.gcdo@gmail.com
        </a>{' '}
        ou das minhas redes sociais abaixo.
      </p>

      <div className='flex flex-row gap-3'>
        <Image
          src="/images/logotipo-do-linkedin.svg"
          alt="image"
          width={45}
          height={45}
          layout="fixed"
          objectFit="contain"
        />
        <Image
          src="/images/github.svg"
          alt="image"
          width={45}
          height={45}
          layout="fixed"
          objectFit="contain"
        />
      </div>
    </Layout>
  );
};

export default About;

export async function getStaticProps() {
  const aboutRes = await fetchAPI('/about', {
    populate: '*',
  });
  return {
    props: {
      aboutMe: aboutRes.data,
    },
    revalidate: 1,
  };
}
