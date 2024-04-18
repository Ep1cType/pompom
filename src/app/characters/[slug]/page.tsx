import { Metadata, ResolvingMetadata } from "next";

import { CharacterInfo } from "organisms/character-info";

import { getCharacter, getCharactersList } from "shared/api/character";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const data = await getCharacter(params.slug);

  return {
    title: data.name,
    description: data.info?.story,
    alternates: {
      canonical: `/characters/${data.slug}`,
    },
    openGraph: {
      title: data.name,
      description: data.info?.story,
      images: [
        data.info?.image.formats.small && {
          url: `${process.env.NEXT_PUBLIC_API_URL}${data.info.image.formats.small.url}`,
          width: data.info.image.formats.small.width,
          height: data.info.image.formats.small.height,
          alt: data.name,
        },
        data.info?.image.formats.thumbnail && {
          url: `${process.env.NEXT_PUBLIC_API_URL}${data.info.image.formats.thumbnail.url}`,
          width: data.info.image.formats.thumbnail.width,
          height: data.info.image.formats.thumbnail.height,
          alt: data.name,
        },
        data.info?.image.formats.medium && {
          url: `${process.env.NEXT_PUBLIC_API_URL}${data.info.image.formats.medium.url}`,
          width: data.info.image.formats.medium.width,
          height: data.info.image.formats.medium.height,
          alt: data.name,
        },
        data.info?.image.formats.large && {
          url: `${process.env.NEXT_PUBLIC_API_URL}${data.info.image.formats.large.url}`,
          width: data.info.image.formats.large.width,
          height: data.info.image.formats.large.height,
          alt: data.name,
        },
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}${data.info?.image.url}`,
          width: data.info?.image.width,
          height: data.info?.image.height,
          alt: data.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const response = await getCharactersList({});
  return response.map((el) => ({ id: el.slug }));
}

async function getData(slug: string) {
  return await getCharacter(slug);
}

export default async function CharacterPage({ params }: Props) {
  const characterInfo = await getData(params.slug);

  return (
    <>
      <CharacterInfo characterInfo={characterInfo} />
    </>
  );
}
