import type { NextPage } from 'next';
import { useState } from 'react';
import Articles from '../components/Articles';
import Layout from '../components/Layout';
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
      <div className="py-20">
        <h1 className="text-5xl font-primary">Seja bem vindo!</h1>
        <h2 className="text-2xl max-w-xl text-zinc-500 mt-2">
          Estou muito feliz em poder compartilhar minhas experiencias com você, espero que possa te
          ajudar em alguma coisa
        </h2>
      </div>
      <div className="flex flex-row justify-between mb-8">
        <span className="before:block before:absolute before:-inset-1 before:top-7 before:left-3 before:bg-amber-200 relative inline-block">
          <span className="relative text-4xl text-black font-primary">Posts</span>
        </span>

        <label className="relative block w-60 items-center">
          <span className="sr-only">Search</span>
          <span className="absolute h-[90%] top-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            className="placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 sm:text-sm"
            placeholder="Pesquisar..."
            type="text"
            name="search"
          />
        </label>
      </div>

      <Articles articles={articlesList} />

      {hasMore && (
        <div
          className="flex flex-row items-center font-primary text-xl cursor-pointer"
          onClick={getMoreArticles}
        >
          <span>Carregar mais</span>
          <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}
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
