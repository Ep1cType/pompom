import React from "react";
import { WarpBlock } from "molecules/warp-block";
import { useUnit } from "effector-react";
import { $warpFilter } from "features/filter-warps/model";

export const WarpInfo = () => {
  const [currentWarpFilter] = useUnit([$warpFilter]);

  return (
    <section className="container mx-auto grid grid-cols-1 gap-2 px-4">
      <WarpBlock gachaType={currentWarpFilter} />
    </section>
  );
};
