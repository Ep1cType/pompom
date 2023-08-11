import React, { useEffect } from "react";
import { useStore } from "effector-react";
import {
  $charactersList,
  fetchCharactersListFx,
} from "entities/character/model";
import { useRouter } from "next/router";
import { CharacterCard } from "molecules/character-card";
import Head from "next/head";
import { PageTitle } from "shared/ui/page-title";
import { Tooltip } from "react-tooltip";

const CharactersPage = () => {
  const charactersList = useStore($charactersList);

  const router = useRouter();

  useEffect(() => {
    fetchCharactersListFx({ locale: router.locale });
  }, [router.locale]);

  return (
    <>
      <Head>
        <title>{`${
          router.locale === "ru" ? "Персонажи" : "Characters"
        } | pom-pom.pro`}</title>
        <meta
          property="og:title"
          content={`${
            router.locale === "ru" ? "Персонажи" : "Characters"
          } | pom-pom.pro`}
        />
        <meta
          property="og:description"
          content={
            router.locale === "ru" ? "Список персонажей" : "Characters List"
          }
        />
        <meta
          name="description"
          content={
            router.locale === "ru" ? "Список персонажей" : "Characters List"
          }
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/characters`}
        />
        <meta property="og:type" content="list" />
        <meta property="og:locale" content={router.locale} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <PageTitle className="mb-8 md:mb-16" text={"Персонажи"} />
        <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
          {charactersList.map((character) => (
            <CharacterCard
              key={character.id}
              name={character.attributes.name}
              img={character.attributes.icon.data.attributes}
              starCount={character.attributes.star}
              element={character.attributes.element}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CharactersPage;
