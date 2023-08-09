import { createEvent, createStore, sample, attach } from "effector";
import { loadWarpListFx } from "shared/api/warp/request";
import { or } from "patronum";
import { GachaType, WarpItem } from "shared/api/warp/types";
import connectLocalStorage from "effector-localstorage/sync";

const fetchWarpListFx = attach({ effect: loadWarpListFx });

export const warpChanged = createEvent<string>();
export const warpLinkSubmitted = createEvent();
export const setWarpDataFromLocalStorage = createEvent("set warp data");

const warpDataLocalStorage = connectLocalStorage("hsr_warp_list").onError(
  (err) => console.log(err),
);

export const $warpLink = createStore("");
export const $warpLinkSubmittedError = createStore<null | string>(null);
export const $warpData = createStore<{ [key in keyof GachaType]: WarpItem[] }>(
  warpDataLocalStorage.init({
    "1": [],
    "2": [],
    "11": [],
    "12": [],
  }),
);

// const $eventCharacterList = $warpData.map(el => el['2'])
// const $eventConeList = $warpData.map(el => el['12'])
// const $newbieList = $warpData.map(el => el['1'])
// const $standardList = $warpData.map(el => el['11'])

export const $fetchWarpListPending = fetchWarpListFx.pending;

export const $formDisabled = or($fetchWarpListPending);

$warpLink.on(warpChanged, (_, link) => link);

sample({
  clock: warpLinkSubmitted,
  source: $warpLink,
  target: fetchWarpListFx,
});

$warpLinkSubmittedError.on(fetchWarpListFx.failData, (_, error) => error);
$warpData.on(fetchWarpListFx.doneData, (_, data) => data);
$warpData.watch(warpDataLocalStorage);
