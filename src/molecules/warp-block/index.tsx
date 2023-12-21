import React from "react";
import { useStore } from "effector-react";
import { $warpData } from "features/fetch-warps/model";
import { WarpCard } from "molecules/warp-card";
import { GachaType } from "shared/api/warp/types";
import { WarpChart } from "molecules/warp-chart";

type Props = {
  gachaType: keyof GachaType;
};

export function countWarpToEnsured(type: keyof GachaType) {
  if (type === "2") {
    return 50;
  }
  if (type === "12") {
    return 80;
  }
  return 90;
}

export const WarpBlock = ({ gachaType }: Props) => {
  const warpData = useStore($warpData);

  function warpToEnsured(type: keyof GachaType) {
    const fiveStarWarpIndex = warpData[type].findIndex(
      (warp) => warp.rank_type === "5",
    );

    if (fiveStarWarpIndex === -1) {
      return countWarpToEnsured(type);
    }

    if (type === "2") {
      if (warpData[type].length === 50) {
        return 0;
      }
    }

    return countWarpToEnsured(type) - fiveStarWarpIndex;
  }

  if (warpData[gachaType].length <= 0) {
    return <p>Прыжков на данном баннере не обнаружено.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mr-2 flex flex-col gap-2 px-2 text-base">
        <WarpChart warpItem={warpData[gachaType]} />
        <p>Прыжков до гаранта: {warpToEnsured(gachaType)}</p>
        <p className="opacity-70">Гарант на {countWarpToEnsured(gachaType)}</p>
      </div>
      <div className="w-full">
        <div className="scrollBar flex gap-2 overflow-x-auto">
          {warpData[gachaType]
            .filter((warpItem) => warpItem.rank_type === "5")
            .map((warpItem, index) => {
              return (
                <WarpCard
                  key={index}
                  warp={warpItem}
                  short
                  count={warpData[gachaType].length - index}
                />
              );
            })}
        </div>
        <div className="scrollBar flex max-h-[500px] flex-grow flex-col gap-2 overflow-y-auto px-2 py-2 shadow-xl">
          {warpData[gachaType].map((warpItem, index) => (
            <WarpCard
              key={index}
              warp={warpItem}
              count={warpData[gachaType].length - index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
