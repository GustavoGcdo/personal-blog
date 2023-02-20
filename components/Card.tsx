import 'moment/locale/pt-br';
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
import { countReadMinutes } from '../lib/word-read-calc';
import { Post } from '../lib/posts';

type Props = {
  article: Post;
};

const Card = ({ article }: Props) => {
  return (
    <div className="dark:p-2 dark:bg-stone-800 dark:border-none rounded flex flex-row transition-all ease-in-out">
      <div className="relative sm:w-[200px] sm:h-[130px] w-[140px] h-[95px] self-center">
        {article.image && <Image src={article.image} alt="image" layout="fill" objectFit="cover" />}
      </div>
      <div className="flex flex-col sm:px-8 px-4 max-w-2xl w-full">
        <Link href={`/articles/${article.slug}`} passHref>
          <span className="block sm:text-2xl text-lg font-bold hover:cursor-pointer hover:underline hover:underline-offset-2">
            {article.title}
          </span>
        </Link>
        <span className="sm:block hidden text-base font-sans mt-2 break-normal dark:text-gray-200 text-gray-600">
          {article.description}
        </span>
        <span className="block group-hover:no-underline sm:text-sm text-xs font-sans mt-3 w-fit dark:text-gray-400 text-gray-400">
          <span>
            <Moment locale="pt-br" format="LL">
              {article.publishedAt}
            </Moment>
          </span>
          {' - ' + countReadMinutes(article.content) + ' min'}
        </span>
      </div>
    </div>
  );
};

export default Card;
