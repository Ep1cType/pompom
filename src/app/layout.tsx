import { ReactNode } from "react";

import { Metadata } from "next";

import clsx from "clsx";
import { Montserrat, Open_Sans } from "next/font/google";
import "react-tooltip/dist/react-tooltip.css";
import "styles/globals.css";

import { Header } from "shared/ui/header";
import { YandexMetrika } from "shared/ui/metrika";
import { TooltipContainer } from "shared/ui/tooltip-container";

const sans = Open_Sans({
  subsets: ["latin", "cyrillic", "greek"],
  variable: "--font-sans",
  weight: "variable",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | pom-pom.pro",
    default: "pom-pom.pro",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN as string),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: {
      template: "%s | pom-pom.pro",
      default: "pom-pom.pro",
    },
    type: "website",
    locale: "ru_RU",
    siteName: "pom-pom.pro",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" prefix="og: https://ogp.me/ns#">
      <body
        className={clsx("flex h-full min-h-screen w-full flex-col text-white", sans.className, montserrat.className)}
      >
        {process.env.NEXT_PUBLIC_ENV === "production" && <meta name="yandex-verification" content="f56ee53bed980370" />}
        {process.env.NEXT_PUBLIC_ENV === "production" && <YandexMetrika />}
        <Header />
        <main className="flex-grow bg-blue-950 text-white">{children}</main>
      </body>
      <TooltipContainer />
    </html>
  );
}
