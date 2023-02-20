import Articles from '../components/Articles';
import Layout from '../components/Layout';
import { HomepageTexts } from '../constants/texts';
import { getSortedPostsData } from '../lib/posts';

const Home = ({ articles }: any) => {
  return (
    <Layout>
      <div className="py-10 mb-10">        
        <h1 className="sm:text-5xl text-4xl text-stone-800 font-primary dark:text-white">
          {HomepageTexts.title}
        </h1>
        <h2 className="sm:text-xl text-xl max-w-lg text-stone-600 dark:text-gray-300 mt-2">
          {HomepageTexts.subtitle}
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

export async function getServerSideProps() {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      articles: allPostsData,
    },
  };
}

export default Home;
