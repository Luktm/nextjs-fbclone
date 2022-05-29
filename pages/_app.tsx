import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // Once SessionProvider has done, we want to do in ssr, so in index.tsx, 
  // declare getServerSideprops and import getSession, so nextjs would set logged user page in ssr.
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
