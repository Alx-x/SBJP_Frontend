import type { AppType } from "next/dist/shared/lib/utils";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "../components/Layout";

import "../styles/globals.css";
import Head from "next/head";
import AuthContextProvider from "../contexts/AuthContext";

const MyApp: AppType<{
  dehydratedState: unknown;
}> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>SBJP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthContextProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
