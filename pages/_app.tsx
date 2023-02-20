import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'normalize.css/normalize.css';
import { createContext, useEffect } from 'react';
import Analytics from '../components/Analytics';
import * as gtag from '../lib/gtag';
import DEFAULT_SEO from '../next-seo.config';
import '../styles/globals.css';

export const GlobalContext = createContext<any>({});

function MyApp({ Component, pageProps }: AppProps) {
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
      <Head>
        <title>Início | Gustavo Oliveira</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/public/favicon.svg" />
        <meta name="theme-color" content="#252628" />
        <meta
          name="description"
          content="Lugar onde compartilho minhas experiências e aprendizados principalmente nos assuntos Javascript, Node.js e Arquitetura de software"
        />
      </Head>
      <GlobalContext.Provider value={{}}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalContext.Provider>
      <DefaultSeo {...DEFAULT_SEO} />
      <Analytics />
    </>
  );
}

export default MyApp;
