import { DefaultSeoProps } from 'next-seo';

const DEFAULT_SEO: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://gustavooliveira.dev/',
    site_name: 'Gustavo Oliveira',
    images: [
      {
        url: 'https://gustavooliveira.dev/images/share-site.png',
        alt: 'Logo Gustavo oliveira',
      },
    ],
  },
  twitter: {
    handle: '@Gustavo_gcdo',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default DEFAULT_SEO;
