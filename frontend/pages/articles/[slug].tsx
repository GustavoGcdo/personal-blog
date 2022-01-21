import Image from 'next/image';
import Layout from '../../components/Layout';
import { fetchAPI, getStrapiURL } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import ReactMarkdown from 'react-markdown';

const ArticlePage = ({ article, categories }: any) => {
  const getContent = () => {
    const finalUrl = getStrapiURL('/uploads/');
    const replaced = article.attributes.content.replaceAll('/uploads/', finalUrl);
    return replaced;
  };

  return (
    <Layout>
      {/*
      <div className="relative overflow-hidden w-full h-64 bg-black flex items-center justify-center">
         {article.attributes?.image?.data ? (
          <Image
            className="opacity-50"
            src={getStrapiMedia(article.attributes.image)}
            alt="image"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image
            src={getStrapiURL(
              '/uploads/default_placeholder_0e5380943a.png?updated_at=2022-01-20T18:31:59.116Z'
            )}
            alt="image"
            layout="fill"
            objectFit="cover"
          />
        )} 

      </div>
      */}
      <span className="text-black text-6xl w-full text-center align-middle">
        {article.attributes.title}
      </span>

      <div className="mt-10 prose prose-lg prose-p:font-sans max-w-none mx-auto prose-h1:mt-20">
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
