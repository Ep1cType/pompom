import { MetadataRoute } from "next";

import { getCharactersList } from "shared/api/character";

const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN || "https://pom-pom.pro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const characterList = await getCharactersList({
    query: {
      "sort[0]": "updatedAt:desc",
    },
  });
  return [
    {
      url: DOMAIN_HOST,
      lastModified: new Date(2024, 3, 16),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${DOMAIN_HOST}/characters`,
      lastModified: characterList?.[0]?.updatedAt ? new Date(characterList[0].updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${DOMAIN_HOST}/warp`,
      lastModified: new Date(2024, 3, 16),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${DOMAIN_HOST}/timeline`,
      lastModified: new Date(2024, 3, 16),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...characterList.map(
      (char) =>
        ({
          url: `${DOMAIN_HOST}/characters/${char.slug}`,
          lastModified: new Date(char.updatedAt),
          changeFrequency: "monthly",
          priority: 0.9,
        } as MetadataRoute.Sitemap[0]),
    ),
  ];
}
