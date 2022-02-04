import 'moment/locale/pt-br';
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
import { getStrapiURL } from '../lib/api';
import { getStrapiMedia } from '../lib/media';
import { countReadMinutes } from '../lib/word-read-calc';

const Card = ({ article }: any) => {
  return (
    <Link href={`/articles/${article.attributes.slug}`} passHref>
      <div className="flex flex-row mb-10 hover:underline hover:underline-offset-2 hover:cursor-pointer transition-all ease-in-out">
        <div className="relative sm:w-[200px] sm:h-[160px] w-[140px] h-[95px] self-center">
          {article.attributes?.image?.data && (
            <Image
              src={getStrapiMedia(article.attributes.image, 'thumbnail')}
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className="flex flex-col sm:px-8 px-4 max-w-2xl h-full w-full">
          <span className="block sm:text-2xl text-lg font-bold">{article?.attributes?.title}</span>
          <span className="sm:block hidden text-base font-sans mt-1 mb-6 break-normal text-gray-500">
            {article.attributes.description}
          </span>
          <span className="block sm:text-sm text-xs font-sans mt-2 text-gray-500 font-medium">
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
