import type { NextPage } from 'next';
import Articles from '../components/Articles';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { homepage_default } from '../constants/texts';
import { fetchAPI } from '../lib/api';

const Home: NextPage = ({ articles, homepage }: any) => {
  
  return (
    <Layout>
      <Seo seo={homepage.attributes.seo} />
      <div className="py-10 mb-10">
        <h1 className="sm:text-5xl text-4xl text-stone-800 font-primary dark:text-white">
          {homepage.attributes.hero.title || homepage_default.title}
        </h1>
        <h2 className="sm:text-xl text-xl max-w-lg text-stone-600 dark:text-gray-300 mt-2">
          {homepage.attributes.hero.subtitle || homepage_default.subtitle}
        </h2>
      </div>

      <div>
        <div className="flex flex-row justify-between mb-4">
          <span className="relative text-4xl text-black dark:text-white font-primary">Posts</span>
        </div>

        <Articles articles={articles} />

        <div className="mx-auto mt-10 w-fit text-center dark:bg-stone-800 bg-stone-200 px-4 py-2 rounded">
          <span className="block dark:text-stone-300 text-gray-500">
            Você chegou ao fim dos posts
          </span>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI('/articles', {
      populate: '*',
      sort: ['publishedAt:desc'],
      pagination: {
        pageSize: 200,
      },
    }),
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
