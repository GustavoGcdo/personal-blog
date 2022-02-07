import { getStrapiURL } from './api';

type MediaVariant = 'thumbnail' | 'large' | 'medium' | 'small';
export function getStrapiMedia(media: any, variant?: MediaVariant) {
  const { url, formats } = media.data.attributes;
  let urlImage = url;

  if (variant && formats) {
    urlImage = formats?.[variant].url;
  }
  
  let finalURL = urlImage.startsWith('/') ? getStrapiURL(urlImage) : urlImage;
  return finalURL;
}
