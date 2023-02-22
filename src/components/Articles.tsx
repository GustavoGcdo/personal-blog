import { Post } from '../lib/posts';
import Card from './Card';

type Props = {
  articles: Post[];
};

const Articles = ({ articles }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {articles.map((article) => (
        <Card key={`article_${article.slug}`} article={article} />
      ))}
    </div>
  );
};

export default Articles;
