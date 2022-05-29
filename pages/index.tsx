import type { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';

export interface Props {
  userSession: Session | null;
}

export default function Home({ userSession }: Props): JSX.Element {
  // remember to wrap `SessionProvider` in `_app.tsx` to enable use of `getSession` and,
  // install NextAuth too
  if (!userSession) return <Login />;

  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="flex">
        <Sidebar />
        <Feed/>
        {/* Widgets */}
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Wrap SessionProvider against to _app.tsx as parent component, else getSession does not recognize it.
  const userSession = await getSession(context);

  return {
    props: { userSession: userSession },
  };
}
