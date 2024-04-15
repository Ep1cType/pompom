import type { Metadata } from "next";

import { WarpContainer } from "organisms/warp-container";

import { PageTitle } from "shared/ui/page-title";

export const metadata: Metadata = {
  title: "История прыжков",
  description: "Здесь Вы можете импортировать из игры ваши прыжки и посмотреть статистику по баннерам.",
  alternates: {
    canonical: "/warp",
  },
  openGraph: {
    title: "История прыжков",
    description: "Здесь Вы можете импортировать из игры ваши прыжки и посмотреть статистику по баннерам.",
  },
};

export default async function WarpPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 ">
        <PageTitle text="История прыжков" className="mb-8 md:mb-16" />
        <WarpContainer />
      </div>
    </>
  );
}
