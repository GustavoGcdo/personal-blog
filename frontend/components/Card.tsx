import 'moment/locale/pt-br';
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
import { getStrapiURL } from '../lib/api';
import { getStrapiMedia } from '../lib/media';

const Card = ({ article }: any) => {
  return (
    <Link href={`/articles/${article.attributes.slug}`} passHref>
      <div className="flex flex-row items-center mb-10 hover:underline hover:underline-offset-2 hover:cursor-pointer transition-all ease-in-out">
        <div className="relative overflow-hidden w-[200px] h-[160px]">
          {article.attributes?.image?.data ? (
            <Image
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
        <div className="flex flex-col p-4 px-8 max-w-2xl">
          <span className="text-2xl">{article?.attributes?.title}</span>
          <span className="text-base font-sans mt-2 break-normal">
            {article.attributes.description}
          </span>
          <span className="font-sans pt-2 text-gray-600 font-medium">
            <Moment locale="pt-br" format="LL">
              {article.attributes.publishedAt}
            </Moment>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
