import type { AppProps } from "next/app";

import { Roboto_Flex } from "@next/font/google";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={robotoFlex.className}>
      <Component {...pageProps} />
    </main>
  );
}
