import { Character, CharacterElement, CharacterExtend, CharacterPath } from "shared/api/character/type";
import { apiReq } from "shared/api/config";
import fetchApi from "shared/api/strapi";
import { ApiCollectionResponse } from "shared/api/types";

export const getCharactersList = () => {
  return fetchApi<Character[]>({
    endpoint: "characters",
    query: {
      populate: "icon",
      "sort[0]": "name",
      "pagination[pageSize]": "100",
    },
    wrappedByKey: "data",
    options: {
      tags: ["character"],
    },
  });
};

export const getCharacter = (slug: string) => {
  return fetchApi<CharacterExtend>({
    endpoint: "characters",
    query: {
      "filters[slug][$eq]": slug,
      "populate[0]": "info",
      "populate[1]": "info.main_skill,info.eidolon,info.eidolon.image,info.image,info.meta_img",
      "populate[2]": "info.main_skill.icon",
    },
    wrappedByKey: "data",
    wrappedByList: true,
    options: {
      tags: ["character"],
    },
  });
};

export class CharacterApi {
  getCharactersListForRss() {
    return apiReq.get<ApiCollectionResponse<CharacterExtend>>("characters", {
      params: {
        locale: "ru",
        "populate[0]": "info",
        "sort[0]": "name",
        "populate[1]": "info.main_skill,info.image,info.meta_img",
      },
    });
  }

  getCharacter({ name, locale }: CharacterParams) {
    return apiReq.get<ApiCollectionResponse<CharacterExtend>>(
      `characters?filters[name][$eq]=${name}&populate[0]=info&populate[1]=info.main_skill,info.eidolon,info.eidolon.image,info.image,info.meta_img&populate[3]=info.main_skill.icon`,
      {
        params: {
          locale,
        },
      },
    );
  }
}

interface Params {
  locale?: string;
  paths?: CharacterPath[];
  elements?: CharacterElement[];
}

interface CharacterParams extends Params {
  name: string;
}
