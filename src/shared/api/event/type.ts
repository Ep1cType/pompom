import { ImageDataResponse, ResponseDataItem, StrapiEntity } from "shared/api/types";

export interface EventItem extends StrapiEntity {
  name: string;
  start_date: string;
  end_date: string;
  color: string;
  link: string;
  type: EventTypeList;
  image: ImageDataResponse;
}

export type EventTypeList = "char_banner" | "cone_banner" | "battle_pass" | "shop" | "oblivion";
