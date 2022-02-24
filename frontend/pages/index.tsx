import type { NextPage } from 'next';
import { useState } from 'react';
import Articles from '../components/Articles';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { homepage_default } from '../constants/texts';
import { fetchAPI } from '../lib/api';

const Home: NextPage = ({ articles, categories, homepage }: any) => {
  const [articlesList, setArticlesList] = useState<any[]>(articles);
  const [actualPage, setActualPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // const getMoreArticles = async () => {
  //   const newArticlesRes = await fetchAPI('/articles', {
  //     populate: '*',
  //     sort: ['publishedAt:desc'],
  //     pagination: {
  //       page: actualPage + 1
  //     },
  //   });

  //   const newArticles: any[] = newArticlesRes.data;
  //   if (newArticles.length > 0) {
  //     setActualPage((old) => old + 1);
  //     setArticlesList((oldList) => oldList.concat(newArticles));
  //   } else {
  //     setHasMore(false);
  //   }
  // };

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

        <Articles articles={articlesList} />

        {/* {hasMore ? (
          <div
            className="group w-fit mx-auto px-3 py-1 rounded flex flex-row items-center font-primary text-xl justify-center cursor-pointer border-2 dark:border-white border-stone-800 dark:hover:bg-white dark:hover:text-stone-900 hover:bg-stone-800 hover:text-white transition-all ease-in-out"
            onClick={getMoreArticles}
          >
            <span className="block mr-2">Carregar mais</span>
            <svg
              className="h-4 w-4 text-black group-hover:text-white dark:text-white dark:group-hover:text-stone-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        ) : (
        )} */}
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
      sort: ['publishedAt:desc']
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
