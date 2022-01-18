import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { createContext } from 'react';
import { fetchAPI } from '../lib/api';
import '../styles/globals.css';

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}

export default MyApp;
