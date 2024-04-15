import { Metadata } from "next";

import { CharactersContainer } from "organisms/characters-container";

import { getCharactersList } from "shared/api/character";
import { PageTitle } from "shared/ui/page-title";

export const metadata: Metadata = {
  title: "Персонажи",
  description: "Список персонажей из игры Honkai: Star Rail",
  alternates: {
    canonical: "/characters",
  },
  openGraph: {
    title: "Персонажи",
    description: "Список персонажей из игры Honkai: Star Rail",
  },
};

async function getData() {
  return await getCharactersList();
}

export default async function CharactersPage() {
  const charactersList = await getData();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <PageTitle className="mb-8 md:mb-16" text="Персонажи" />
        <CharactersContainer charactersList={charactersList} />
      </div>
    </>
  );
}
