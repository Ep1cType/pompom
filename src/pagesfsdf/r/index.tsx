import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { TierList } from "shared/api/tier-list/types";
import { TierListApi } from "shared/api/tier-list";
import { CharacterCard } from "molecules/character-card";

const TierListPage = ({ tierList }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!tierList) {
    return <h2>Ошибка сервера</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex w-full flex-col gap-1">
        {tierListLetters.map((letter) => (
          <div key={letter} className="flex w-full">
            <div
              style={{ backgroundColor: tierListColors[letter] }}
              className="flex w-24 items-center justify-center rounded-l text-3xl/none font-medium text-blue-950"
            >
              {letter}
            </div>
            <div className="grid w-full grid-cols-3 gap-5 bg-blue-900 px-4 py-4 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-12">
              {/*{tierList[letter].data.map((tier) => (*/}
              {/*  // <CharacterCard*/}
              {/*  //   key={tier.id}*/}
              {/*  //   className="w-16"*/}
              {/*  //   name={tier.attributes.name}*/}
              {/*  //   img={tier.attributes.icon.data.attributes}*/}
              {/*  //   starCount={tier.attributes.star}*/}
              {/*  //   element={tier.attributes.element}*/}
              {/*  // />*/}
              {/*))}*/}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const tierListLetters: TierLetters[] = ["s", "a", "b", "c", "d"];
type TierLetters = keyof Pick<TierList, "s" | "a" | "b" | "c" | "d">;

interface TierColors {
  [K: string]: string;
}

const tierListColors: TierColors = {
  s: "#E57373",
  a: "#FFB74D",
  b: "#FFF176",
  c: "#AED581",
  d: "#81C784",
};

export const getStaticProps: GetStaticProps<{
  tierList: TierList | null;
}> = async (context) => {
  const Api = new TierListApi();

  try {
    const response = await Api.getTierList({ locale: context.locale });

    return {
      props: {
        tierList: response.data.data.attributes,
      },
      revalidate: 120,
    };
  } catch (e) {
    return {
      props: {
        tierList: null,
      },
      notFound: true,
      revalidate: 120,
    };
  }
};

export default TierListPage;
