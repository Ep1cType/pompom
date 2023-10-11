import React, { useEffect } from "react";
import { useStore } from "effector-react";
import {
  $charactersList,
  $selectedCharacterFilterList,
  CharacterGate,
  fetchCharactersListFx,
  selectElementFilter,
  selectPathFilter,
} from "entities/character/model";
import { useRouter } from "next/router";
import Head from "next/head";
import { PageTitle } from "shared/ui/page-title";
import {
  CharacterElementList,
  CharacterPathList,
} from "shared/api/character/type";
import clsx from "clsx";
import Image from "next/image";
import dynamic from "next/dynamic";
const Loader = dynamic(
  () => import("shared/ui/loader").then((mod) => mod.Loader),
  {
    ssr: false,
  },
);
const CharacterCard = dynamic(
  () => import("molecules/character-card").then((mod) => mod.CharacterCard),
  {
    ssr: false,
  },
);

const CharactersPage = () => {
  const charactersList = useStore($charactersList);
  const isLoading = useStore(fetchCharactersListFx.pending);
  const selectedCharacterFilterList = useStore($selectedCharacterFilterList);

  const router = useRouter();

  useEffect(() => {
    fetchCharactersListFx({ locale: router.locale });
  }, [router.locale]);

  const characterElementList: CharacterElementList[] = [
    "quantum",
    "fire",
    "ice",
    "imaginary",
    "lightning",
    "physical",
    "wind",
  ];

  const characterPathList: CharacterPathList[] = [
    "harmony",
    "hunt",
    "abundance",
    "destruction",
    "erudition",
    "nihility",
    "preservation",
  ];

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

        <ul className="mb-10 flex flex-wrap justify-center gap-2 md:mb-20 md:flex-nowrap md:justify-normal">
          {characterElementList.map((element) => (
            <li
              className={clsx(
                selectedCharacterFilterList.elements.includes(element) &&
                  "bg-blue-800 text-orange",
                "rounded-xl border border-blue-800 p-2 md:p-3",
              )}
              key={element}
              role="button"
              onClick={() => selectElementFilter(element)}
            >
              <Image
                className="h-4 w-4 md:h-5 md:w-5"
                src={`/icons/elements/${element}.webp`}
                width={256}
                height={256}
                alt={`${element} icon`}
              />
            </li>
          ))}

          {characterPathList.map((path) => (
            <li
              className={clsx(
                selectedCharacterFilterList.paths.includes(path) &&
                  "bg-blue-800 text-orange",
                "rounded-xl border border-blue-800 p-2 md:p-3",
              )}
              key={path}
              role="button"
              onClick={() => selectPathFilter(path)}
            >
              <Image
                className="h-4 w-4 md:h-5 md:w-5"
                src={`/icons/paths/${path}.png`}
                width={108}
                height={108}
                alt={`${path} icon`}
              />{" "}
            </li>
          ))}
        </ul>

        {!charactersList.length && !isLoading && (
          <h2 className="col-span-4 md:col-span-5 lg:col-span-7 xl:col-span-10">
            Ничего не найдено
          </h2>
        )}
        {isLoading && <Loader />}
        <section className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
          {!!charactersList.length &&
            !isLoading &&
            charactersList.map((character) => (
              <CharacterCard
                key={character.id}
                name={character.attributes.name}
                img={character.attributes.icon.data.attributes}
                starCount={character.attributes.star}
                element={character.attributes.element}
              />
            ))}
        </section>
      </div>
      <CharacterGate />
    </>
  );
};

export default CharactersPage;
