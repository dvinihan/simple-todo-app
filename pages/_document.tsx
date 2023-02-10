import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="/manifest.json" rel="manifest" />
        <link href="/favicon.ico" rel="apple-touch-icon"></link>
      </Head>
      <body style={{ backgroundColor: "lightblue" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
