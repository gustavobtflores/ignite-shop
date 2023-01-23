import type { AppProps } from "next/app";

import { Roboto_Flex } from "@next/font/google";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { Container, Header } from "../styles/pages/app";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${robotoFlex.style.fontFamily};
          }
        `}
      </style>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
        </Header>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
