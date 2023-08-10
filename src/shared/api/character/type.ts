import {
  CreateBody,
  ImageDataResponse,
  ResponseDataItem,
} from "shared/api/types";

export interface Character {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  icon: CreateBody<ResponseDataItem<ImageDataResponse>>;
  star: "four" | "five";
  element: CharacterElementList;
  path: CharacterPathList;
  meta_desc: string;
}

export type CharacterElementList =
  | "fire"
  | "ice"
  | "lightning"
  | "wind"
  | "physical"
  | "quantum"
  | "imaginary";

export type CharacterSexList = "male" | "female";

export type CharacterPathList =
  | "abundance"
  | "destruction"
  | "erudition"
  | "harmony"
  | "hunt"
  | "nihility"
  | "preservation";

export interface CharacterExtend extends Character {
  info: {
    id: number;
    sex: CharacterSexList;
    main_skill: CharacterMainSkill[];
    eidolon: CharacterEidolonItem[];
    image: {
      data: ResponseDataItem<ImageDataResponse>;
    };
    meta_img: {
      data: ResponseDataItem<ImageDataResponse>;
    };
    story: string;
  };
}

export interface CharacterMainSkill {
  description: {};
  icon: CreateBody<ResponseDataItem<ImageDataResponse>>;
  id: number;
  name: string;
  text_color: string;
  type: string;
}

export interface CharacterEidolonItem {
  name: string;
  description: {
    [key: string]: string;
  };
  image: {
    data: ResponseDataItem<ImageDataResponse>;
  };
  id: number;
  number: number;
}
