import Card from './Card';

const Articles = ({ articles }: any) => {
  return (
    <div className='flex flex-col gap-6'>
      {articles.map((article: any) => (
        <Card key={`article_${article.attributes.slug}`} article={article} />
      ))}
    </div>
  );
};

export default Articles;
