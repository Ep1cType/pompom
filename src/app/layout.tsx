import { ReactNode } from "react";

import { Metadata } from "next";

import "react-tooltip/dist/react-tooltip.css";
import "styles/globals.css";

import { Header } from "shared/ui/header";
import { TooltipContainer } from "shared/ui/tooltip-container";

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
      <body className="flex h-full min-h-screen w-full flex-col text-white">
        <Header />
        <main className="flex-grow bg-blue-950 text-white">{children}</main>
      </body>
      <TooltipContainer />
    </html>
  );
}
