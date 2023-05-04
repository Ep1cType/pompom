import { Html, Head, Main, NextScript } from 'next/document'
import { YandexMetrika } from 'shared/ui/metrika';

export default function Document() {
  return (
    <Html prefix="og: http://ogp.me/ns#">
      <Head>
        {process.env.NEXT_PUBLIC_ENV === "production" && (
          <meta name="yandex-verification" content="f56ee53bed980370" />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
