import 'moment/locale/pt-br';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Layout from '../../components/Layout';
import { getPostBySlug, Post, getSortedPostsData } from '../../lib/posts';
import { countReadMinutes } from '../../lib/word-read-calc';

type Props = {
  article: Post;
};

const ArticlePage = ({ article }: Props) => {
  return (
    <>
      <NextSeo
        title={`${article.title} | Gustavo Oliveira`}
        description={article.description}        
        openGraph={{
          url: `https://www.gustavooliveira.dev/articles/${article.slug}`,
          title: `${article.title} | Gustavo Oliveira`,
          description: article.description
        }}
      />

      <Layout>
        <div className="sm:bg-white sm:dark:bg-stone-800 rounded sm:p-10 p-0 mt-3">
          <div className="flex flex-col mb-14">
            <span className="block text-black dark:text-white text-4xl font-bold">
              {article.title}
            </span>
            <span className="text-gray-500 dark:text-gray-300 mt-2 text-xl">
              {article.description}
            </span>
            <span className="text-sm font-sans mt-2 w-fit py-1 rounded dark:bg-gray-700 bg-gray-200 px-2 dark:text-white text-gray-700 font-medium">
              <Moment locale="pt-br" format="LL">
                {article.publishedAt}
              </Moment>{' '}
              - {countReadMinutes(article.content) + ' min de leitura'}
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
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  const post = getPostBySlug(String(slug));

  return {
    props: {
      article: post,
    },
  };
};

export async function getStaticPaths() {
  const posts = getSortedPostsData();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export default ArticlePage;
