import { Auth0Provider } from '@auth0/auth0-react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'normalize.css/normalize.css';
import { useEffect } from 'react';
import DEFAULT_SEO from '../../next-seo.config';
import Analytics from '../components/Analytics';
import * as gtag from '../lib/gtag';
import '../styles/globals.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
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
      <Auth0Provider
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      >
        <Head>
          <title>Gustavo Oliveira</title>
          <link rel="shortcut icon" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/public/favicon.svg" />
          <meta name="theme-color" content="#252628" />
          <meta
            name="description"
            content="Lugar onde compartilho minhas experiências e aprendizados principalmente nos assuntos Javascript, Node.js e Arquitetura de software"
          />
        </Head>

        <ThemeProvider attribute="class" enableSystem={false}>
          <main className={`font-sans font-Staatliches`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>

        <DefaultSeo {...DEFAULT_SEO} />
        <Analytics />
      </Auth0Provider>
    </>
  );
};

export default CustomApp;
