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

  const getMoreArticles = async () => {
    const newArticlesRes = await fetchAPI('/articles', {
      populate: '*',
      sort: ['publishedAt:desc'],
      pagination: {
        page: actualPage + 1,
        pageSize: 5,
      },
    });

    const newArticles: any[] = newArticlesRes.data;
    if (newArticles.length > 0) {
      setActualPage((old) => old + 1);
      setArticlesList((oldList) => oldList.concat(newArticles));
    } else {
      setHasMore(false);
    }
  };

  return (
    <Layout>
      <Seo seo={homepage.attributes.seo} />
      <div className="sm:py-20 py-10 mb-4">
        <h1 className="sm:text-5xl text-4xl font-primary">
          {homepage.attributes.hero.title || homepage_default.title}
        </h1>
        <h2 className="sm:text-1xl text-xl max-w-lg text-zinc-500 mt-2">
          {homepage.attributes.hero.subtitle || homepage_default.subtitle}
        </h2>
      </div>

      <div>
        <div className="flex flex-row justify-between mb-8">
          <span className="before:block before:absolute before:-inset-1 before:top-7 before:left-3 before:bg-amber-200 relative inline-block">
            <span className="relative text-4xl text-black font-primary">Posts</span>
          </span>
        </div>

        <Articles articles={articlesList} />

        {hasMore ? (
          <div
            className="group w-fit mx-auto px-3 py-1 rounded flex flex-row items-center font-primary text-xl justify-center cursor-pointer border-2 border-stone-800 hover:bg-stone-800 hover:text-white transition-all ease-in-out"
            onClick={getMoreArticles}
          >
            <span className="block mr-2">Carregar mais</span>
            <svg
              className="h-4 w-4 text-black group-hover:text-white"
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
          <div className="mx-auto text-center bg-gray-200 py-2 rounded">
            <span className="block text-gray-500">Você chegou ao fim dos posts</span>
          </div>
        )}
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
        page: 1,
        pageSize: 5,
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
