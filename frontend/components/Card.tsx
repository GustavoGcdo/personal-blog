import 'moment/locale/pt-br';
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
import { getStrapiMedia } from '../lib/media';
import { countReadMinutes } from '../lib/word-read-calc';

const Card = ({ article }: any) => {
  return (
    <Link href={`/articles/${article.attributes.slug}`} passHref>
      <div className="group flex flex-row mb-10 hover:cursor-pointer transition-all ease-in-out">
        <div className="relative sm:w-[200px] sm:h-[160px] w-[140px] h-[95px] self-center">
          {article.attributes?.image?.data && (
            <Image
              src={getStrapiMedia(article.attributes.image, 'medium')}
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className="flex flex-col sm:px-8 px-4 max-w-2xl w-full">
          <span className="block sm:text-2xl text-lg font-bold group-hover:underline group-hover:underline-offset-2">{article?.attributes?.title}</span>
          <span className="sm:block hidden text-base font-sans mt-2 break-normal dark:text-gray-200 text-gray-600">
            {article.attributes.description}
          </span>
          <span className="block group-hover:no-underline sm:text-sm text-xs font-sans mt-3 w-fit dark:text-gray-400 text-gray-400">
            <span>
              <Moment locale="pt-br" format="LL">
                {article.attributes.publishedAt}
              </Moment>
            </span>
            {' - ' + countReadMinutes(article.attributes.content) + ' min'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
