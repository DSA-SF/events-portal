import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function Application({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
