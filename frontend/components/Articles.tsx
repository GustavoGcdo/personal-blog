import Card from './Card';

const Articles = ({ articles }: any) => {
  return (
    <div>
      {articles.map((article: any) => (
        <Card key={`article_${article.attributes.slug}`} article={article} />
      ))}
    </div>
  );
};

export default Articles;
