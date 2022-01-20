import type { NextPage } from 'next';
import Image from 'next/image';
import Moment from 'react-moment';
import Layout from '../components/Layout';
import { fetchAPI, getStrapiURL } from '../lib/api';
import 'moment/locale/pt-br';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="py-20">
        <h1 className="text-5xl">Seja bem vindo!</h1>
        <h2 className="text-2xl max-w-xl text-zinc-500 mt-2">
          Estou muito feliz em poder compartilhar minhas experiencias com você,
          espero que possa te ajudar em alguma coisa
        </h2>
      </div>
      <div className="flex flex-row justify-between mb-8">
        <span className="before:block before:absolute before:-inset-1 before:top-7 before:left-3 before:bg-amber-200 relative inline-block">
          <span className="relative text-4xl text-black">Posts</span>
        </span>

        <label className="relative block w-60 items-center">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-3 top-0 left-0 flex items-center pl-2">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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

      <div>
        <div className="flex flex-row items-center mt-3 hover:underline hover:underline-offset-2 hover:cursor-pointer transition-all ease-in-out delay-75 p-2 rounded">
          <div className="relative overflow-hidden w-[200px] h-[160px]">
            <Image
              src={getStrapiURL(
                '/uploads/3f24173a2290c80805492ce6c5db0e92_ca327c62cb.png?updated_at=2022-01-19T21:21:41.529Z'
              )}
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col p-4 px-8 max-w-2xl">
            <span className="text-2xl">
              Como eu transformei a cultura de uma empresa usando Clean
              Architecture
            </span>
            <span className="text-base font-sans mt-2 break-normal">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
              quis voluptatibus alias fugit obcaecati ad, ipsam voluptas
              laboriosam eligendi cumque eum maiores debitis aperiam, velit
              fuga! Quaerat voluptatum minus esse!
            </span>
            <span className="font-sans pt-2 text-gray-600 font-medium">
              <Moment locale="pt-br" format="LL">
                {new Date()}
              </Moment>
            </span>
          </div>
        </div>
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
