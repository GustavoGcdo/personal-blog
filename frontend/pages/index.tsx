import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { fetchAPI } from '../lib/api';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="py-20">
        <h1 className="text-5xl">Seja bem vindo!</h1>
        <h2 className="text-2xl max-w-xl text-zinc-500">
          Estou muito feliz em poder compartilhar minhas experiencias com você,
          espero que possa te ajudar em alguma coisa
        </h2>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI('/articles', { populate: '*' }),
    fetchAPI('/categories', { populate: '*' }),
    fetchAPI('/homepage', {
      populate: {
        hero: '*',
        seo: { populate: '*' },
      },
    }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
