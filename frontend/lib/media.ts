import { getStrapiURL } from './api';

type MediaVariant = 'thumbnail' | 'large' | 'medium' | 'small';
export function getStrapiMedia(media: any, variant?: MediaVariant) {
  const { url, formats } = media.data.attributes;
  
  if (variant && formats) {
    return getStrapiURL(formats?.[variant].url);
  }

  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}
