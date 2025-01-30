import { Footer } from 'components/Footer';
import Header from 'components/Header';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import GlobalStyles from '../styles/global';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: any;
};

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  const handleViewport = () => {
    const vh = window.innerHeight * 0.001;
    document.documentElement.style.setProperty('--vh', `${vh}rem`);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      handleViewport();
      window.addEventListener('resize', handleViewport);
      return () => {
        window.removeEventListener('resize', handleViewport);
      };
    }
  }, []);

  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      <Head>
        <title>Atmos</title>
        <meta name="theme-color" content="#06092B" />
        <meta name="description" />
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
      </Head>
      <GlobalStyles />
      <SessionProvider session={session}>
        {/* <AuthenticationMiddleware /> */}
        <Header />
        {getLayout(<Component {...pageProps} />)}
        <Footer showVersion={true} />
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default App;
