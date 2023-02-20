import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'normalize.css/normalize.css';
import { createContext, useEffect } from 'react';
import Analytics from '../components/Analytics';
import * as gtag from '../lib/gtag';
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
      <GlobalContext.Provider value={{}}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalContext.Provider>
      <Analytics />
    </>
  );
}

export default MyApp;
