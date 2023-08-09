import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseDataItem } from "shared/api/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GuideApi } from "shared/api/guide";
import { Guide } from "shared/api/guide/type";
import { useRouter } from "next/router";
import { GuideInfo } from "organisms/guide-info";

const Api = new GuideApi();

const GuidePage = ({
  guidePage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (guidePage) {
    return <GuideInfo guidePage={guidePage} />;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await Api.getGuideList();

  const paths = response.data.data.map((char) => ({
    params: { slug: char.attributes.slug },
    locale: char.attributes.locale,
  }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps<{
  guidePage: ResponseDataItem<Guide> | null;
}> = async (context) => {
  const locale = context.locale as string;
  const slug = context.params!.slug as string;

  try {
    const response = await Api.getGuidePage({ slug });

    if (response.data.data.length > 0) {
      return {
        props: {
          guidePage: response.data.data[0] ?? null,
          ...(await serverSideTranslations(locale, ["common", "character"])),
        },
        revalidate: 60,
      };
    }

    return {
      props: {
        guidePage: null,
        ...(await serverSideTranslations(locale, ["common", "character"])),
      },
      redirect: {
        revalidate: 60,
        destination: "/404",
      },
    };
  } catch (e) {
    return {
      props: {
        guidePage: null,
        ...(await serverSideTranslations(locale, ["common", "character"])),
      },
      redirect: {
        revalidate: 60,
        destination: "/404",
      },
    };
  }
};

export default GuidePage;
