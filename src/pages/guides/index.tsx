import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseDataItem } from "shared/api/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Guide } from "shared/api/guide/type";
import { GuideApi } from "shared/api/guide";
import { GuideCard } from "molecules/guide-card";

const GuidesPage = ({
  guidesList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {guidesList.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  guidesList: ResponseDataItem<Guide>[];
}> = async (context) => {
  const Api = new GuideApi();

  const locale = context.locale as string;

  try {
    const response = await Api.getGuideList();

    return {
      props: {
        guidesList: response.data.data,
        ...(await serverSideTranslations(locale, ["common", "character"])),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        guidesList: [],
        ...(await serverSideTranslations(locale, ["common", "character"])),
      },
    };
  }
};

export default GuidesPage;
