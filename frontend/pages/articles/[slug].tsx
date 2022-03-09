import 'moment/locale/pt-br';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { fetchAPI, getStrapiURL } from '../../lib/api';
import { countReadMinutes } from '../../lib/word-read-calc';

const ArticlePage = ({ article }: any) => {
  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  const getContent = () => {
    const finalUrl = getStrapiURL('/uploads/');
    const replaced = article.attributes.content.replace(new RegExp('/uploads/', 'g'), finalUrl);
    return replaced;
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="sm:bg-white sm:dark:bg-stone-800 rounded sm:p-10 p-0 mt-3">
        <div className="flex flex-col mb-14">
          <span className="block text-black dark:text-white text-4xl font-bold">
            {article.attributes.title}
          </span>
          <span className="text-gray-500 dark:text-gray-300 mt-2 text-xl">
            {article.attributes.description}
          </span>
          <span className="text-sm font-sans mt-2 w-fit py-1 rounded dark:bg-gray-700 bg-gray-200 px-2 dark:text-white text-gray-700 font-medium">
            <Moment locale="pt-br" format="LL">
              {article.attributes.publishedAt}
            </Moment>{' '}
            - {countReadMinutes(article.attributes.content) + ' min de leitura'}
          </span>
        </div>

        <div className="mt-5 prose prose-lg prose-pre:bg-zinc-800 prose-pre:px-2 prose-pre:py-0 dark:prose-invert prose-p:font-sans max-w-none mx-auto prose-h1:mt-10 prose-img:w-2/3 prose-img:mx-auto">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialDark}
                    language={match[1] || 'javascript'}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {getContent()}
          </ReactMarkdown>
        </div>
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
    fallback: 'blocking',
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
