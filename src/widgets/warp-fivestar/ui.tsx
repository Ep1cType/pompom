import { FiveStarCard } from "molecules/warp-card";
import React from "react";
import { useStore, useUnit } from "effector-react";
import { $warpData } from "features/fetch-warps/model";
import { $warpFilter } from "features/filter-warps/model";
import { BadgeProps } from "shared/ui/badge";

export const WarpFivestar = () => {
  const warpData = useStore($warpData);
  const [gachaType] = useUnit([$warpFilter]);

  return (
    <div className="scrollBar mb-4 flex max-h-[16rem] flex-col gap-1 overflow-y-auto rounded-lg bg-blue-900 empty:hidden lg:hidden">
      {warpData[gachaType].map((item, index) => {
        if (item.rank_type === "5") {
          let position = 0;
          let badgeColor: BadgeProps["intent"] = "yellow";
          const nextFiveStarIndex = warpData[gachaType].findIndex(
            (el, idx) => idx >= index + 1 && el.rank_type === "5",
          );

          if (index === 0 && nextFiveStarIndex === -1) {
            position = warpData[gachaType].length;
          }
          if (index !== 0 && nextFiveStarIndex === -1) {
            position = warpData[gachaType].length - index;
          }

          if (
            (index !== 0 && nextFiveStarIndex !== -1) ||
            (index === 0 && nextFiveStarIndex !== -1)
          ) {
            position = nextFiveStarIndex - index;
          }

          if (position <= 50) {
            badgeColor = "green";
          }
          if (position >= 51 && position <= 65) {
            badgeColor = "yellow";
          }
          if (position >= 66) {
            badgeColor = "red";
          }

          return (
            <FiveStarCard
              key={index}
              warp={item}
              short
              count={warpData[gachaType].length - index}
              number={position}
              badgeColor={badgeColor}
            />
          );
        }
      })}
    </div>
  );
};
