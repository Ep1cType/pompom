import { createEffect } from "effector";
import { GachaType, WarpItem } from "shared/api/warp/types";
import { WarpApi } from "shared/api/warp/index";

export const gachaTypeList: Array<keyof GachaType> = ["1", "2", "11", "12"];

const Api = new WarpApi();

export const loadWarpListFx = createEffect<string, any, any>(async (link) => {
  try {
    const url = new URL(link);
    const data: { [key in keyof GachaType]: WarpItem[] } = {
      "1": [],
      "2": [],
      "11": [],
      "12": [],
    };
    url.searchParams.delete("gacha_type");
    for (const gachaType of gachaTypeList) {
      url.searchParams.set("gacha_type", gachaType);
      const response = await Api.getWarpList(url.toString());
      data[gachaType] = response.data;
    }
    return data;
  } catch (e) {
    return Promise.reject("Check link");
  }
});
