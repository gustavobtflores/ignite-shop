import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../styles";

export default function Document() {
  return (
    <Html>
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
