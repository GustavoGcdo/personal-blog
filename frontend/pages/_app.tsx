import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { createContext } from 'react';
import { fetchAPI } from '../lib/api';
import 'normalize.css/normalize.css';
import '../styles/globals.css';
import { getStrapiMedia } from '../lib/media';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

export const GlobalContext = createContext<any>({});

function MyApp({ Component, pageProps }: AppProps) {
  const { global } = pageProps;

  return (
    <>
      {global.attributes.favicon && (
        <Head>
          <link rel="shortcut icon" href={getStrapiMedia(global.attributes.favicon)} />
        </Head>
      )}
      <GlobalContext.Provider value={global.attributes}>
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI('/global', {
    populate: {
      favicon: '*',
      defaultSeo: {
        populate: '*',
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
