import type { AppProps } from "next/app";

import { Roboto } from "@next/font/google";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { Container, Header } from "../styles/pages/app";
import "@/src/lib/nprogress/nprogress.css";
import Link from "next/link";
import { useEffect } from "react";
import NProgress from "nprogress";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

globalStyles();

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);

  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>
        </Header>

        <Component {...pageProps} />
      </Container>
    </>
  );
}
