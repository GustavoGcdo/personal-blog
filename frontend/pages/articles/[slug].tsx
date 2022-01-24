import 'moment/locale/pt-br';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import Layout from '../../components/Layout';
import { fetchAPI, getStrapiURL } from '../../lib/api';

const ArticlePage = ({ article, categories }: any) => {
  const router = useRouter();
  
  const getContent = () => {
    const finalUrl = getStrapiURL('/uploads/');
    const replaced = article.attributes.content.replace(new RegExp('/uploads/', 'g'), finalUrl);
    return replaced;
  };

  const countReadMinutes = () => {
    const wordCount = article.attributes.content.split(' ').length;
    const readingRateInSeconds = (wordCount * 60) / 200;
    const inMinutes = Math.round(readingRateInSeconds / 60);
    return inMinutes;
  };

  return (
    <Layout>
      <div
        className="group flex cursor-pointer items-center rounded px-2 w-fit hover:text-white hover:bg-black transition-all ease-in-out"
        onClick={() => router.back()}
      >
        <svg
          className="h-5 w-5 text-black group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>

        <span className="ml-2 text-lg font-primary">voltar</span>
      </div>
      <div className="flex flex-col mt-5 mb-14">
        <span className="text-black text-3xl">{article.attributes.title}</span>
        <span className="text-black text-xl">{article.attributes.description}</span>
        <span className="font-sans mt-2 text-gray-600 font-medium">
          <Moment locale="pt-br" format="LL">
            {article.attributes.publishedAt}
          </Moment>{' '}
          - {countReadMinutes() + ' min de leitura'}
        </span>
      </div>

      <div className="mt-5 prose prose-lg prose-p:font-sans max-w-none mx-auto prose-h1:mt-10 prose-img:w-1/2 prose-img:mx-auto">
        <ReactMarkdown>{getContent()}</ReactMarkdown>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI('/articles', { fields: ['slug'] });

  return {
    paths: articlesRes.data.map((article: any) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const articlesRes = await fetchAPI('/articles', {
    filters: {
      slug: params.slug,
    },
    populate: '*',
  });
  const categoriesRes = await fetchAPI('/categories');

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 1,
  };
}

export default ArticlePage;
