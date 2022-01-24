import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import { fetchAPI } from '../lib/api';

const About = ({ aboutMe }: any) => {
  return (
    <Layout>
      <h1>Sobre mim</h1>

      <div className="prose prose-lg prose-p:font-sans max-w-none mx-auto prose-h1:mt-10 prose-img:w-1/2 prose-img:mx-auto">
        <ReactMarkdown>{aboutMe.attributes.content}</ReactMarkdown>
      </div>
    </Layout>
  );
};

export default About;

export async function getStaticProps() {
  const aboutRes = await fetchAPI('/about', {
    populate: {
      hero: '*',
      seo: { populate: '*' },
    },
  });
  return {
    props: {
      aboutMe: aboutRes.data,
    },
    revalidate: 1,
  };
}
