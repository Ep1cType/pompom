import { CreateBody, ImageDataResponse, ResponseDataItem, StrapiEntity } from "shared/api/types";

export interface Character extends StrapiEntity {
  name: string;
  slug: string;
  star: "four" | "five";
  element: CharacterElement;
  path: CharacterPath;
  meta_desc: string;
  locale: string;
  icon: ImageDataResponse;
}

export type CharacterElement = "fire" | "ice" | "lightning" | "wind" | "physical" | "quantum" | "imaginary";

export type CharacterSex = "male" | "female";

export type CharacterPath =
  | "abundance"
  | "destruction"
  | "erudition"
  | "harmony"
  | "hunt"
  | "nihility"
  | "preservation";

export type CharacterSkillList = "baseChance" | "bonusAttack";

export interface CharacterExtend extends Character {
  info: {
    id: number;
    sex: CharacterSex;
    main_skill: CharacterMainSkill[];
    eidolon: CharacterEidolonItem[];
    image: ImageDataResponse;
    meta_img: ImageDataResponse;
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
  image: ImageDataResponse;
  id: number;
  number: number;
}
