import { apiReq } from "shared/api/config";
import { ApiCollectionResponse } from "shared/api/types";
import { Character, CharacterExtend } from "shared/api/character/type";

export class CharacterApi {
  getCharactersList({ locale = "ru" }: Params) {
    return apiReq.get<ApiCollectionResponse<Character>>("characters", {
      params: {
        populate: "icon",
        locale,
        "sort[0]": "name",
        "pagination[pageSize]": 100,
      },
    });
  }

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
}

interface CharacterParams extends Params {
  name: string;
}
