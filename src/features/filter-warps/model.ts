import { createEvent, createStore, sample } from "effector";
import { GachaType } from "shared/api/warp/types";
import { warpStatData } from "widgets/warp-stats/model";
import { $warpData } from "features/fetch-warps/model";
import { countWarpToEnsured } from "molecules/warp-block";

export const setWarpFilter = createEvent<keyof GachaType>();

export const $warpFilter = createStore<keyof GachaType>("2");

$warpFilter.on(setWarpFilter, (_, filter) => filter);

export const $warpStats = createStore(warpStatData);

sample({
  clock: setWarpFilter,
  source: $warpData,
  fn: (data, type) => {
    const currentData = data[type];

    const lastFiveStarWarpIndex = currentData.findIndex(
      (warp) => warp.rank_type === "5",
    );
    const lastFourStarWarpIndex = currentData.findIndex(
      (warp) => warp.rank_type === "4" || warp.rank_type === "5",
    );
    const beforeFiveStar = countWarpToEnsured(type) - lastFiveStarWarpIndex;
    const beforeFourStar = 10 - lastFourStarWarpIndex;

    let newData = warpStatData;
    newData["allWarp"].value = currentData.length.toString();
    newData["allJade"].value = (currentData.length * 160).toString();
    newData["5Warp"].value = currentData
      .filter((item) => item.rank_type === "5")
      .length.toString();
    newData["4Warp"].value = currentData
      .filter((item) => item.rank_type === "4")
      .length.toString();
    newData["3Warp"].value = currentData
      .filter((item) => item.rank_type === "3")
      .length.toString();
    newData["before5"].value = `${
      currentData.length <= 0 ? 0 : beforeFiveStar
    }/${countWarpToEnsured(type)}`;
    newData["before4"].value = `${
      currentData.length <= 0 ? 0 : beforeFourStar
    }/10`;

    return newData;
  },
  target: $warpStats,
});

setWarpFilter("2");
