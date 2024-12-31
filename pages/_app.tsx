import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/?search=${query}`);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Movie search application" />
        <title>Movie Search</title>
      </Head>
      <div className={inter.className}>
        <ErrorBoundary>
          <Layout onSearch={handleSearch}>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </div>
    </>
  );
}
