import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { createContext, useEffect } from 'react';
import { fetchAPI } from '../lib/api';
import 'normalize.css/normalize.css';
import '../styles/globals.css';
import { getStrapiMedia } from '../lib/media';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import Analytics from '../components/Analytics';

export const GlobalContext = createContext<any>({});

function MyApp({ Component, pageProps }: AppProps) {
  const { global } = pageProps;

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {global.attributes.favicon && (
        <Head>
          <link rel="shortcut icon" href={getStrapiMedia(global.attributes.favicon)} />
        </Head>
      )}
      <GlobalContext.Provider value={global.attributes}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalContext.Provider>
      <Analytics />
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
