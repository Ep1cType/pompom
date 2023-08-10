import "styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "shared/ui/layout";
import { Open_Sans, Montserrat } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { YandexMetrika } from "shared/ui/metrika";

const sans = Open_Sans({
  subsets: ["latin", "cyrillic", "greek"],
  variable: "--font-sans",
  weight: "variable",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: "variable",
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_ENV === "production" && <YandexMetrika />}
      <Layout className={`${sans.variable} ${montserrat.variable}`}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default appWithTranslation(App);
