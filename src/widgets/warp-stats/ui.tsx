import React, { PropsWithChildren, ReactNode } from "react";
import { warpStatData } from "widgets/warp-stats/model";
import { useUnit } from "effector-react";
import { $warpFilter } from "features/filter-warps/model";
import Image from "next/image";
import clsx from "clsx";

export const WarpStats = () => {
  const [currentWarpFilter] = useUnit([$warpFilter]);

  return (
    <section className="my-4 rounded-lg bg-blue-900 p-2 lg:hidden">
      <ul className="space-y-1 text-sm text-white">
        {Object.values(warpStatData).map((item, index) => (
          <WarpStatsItem
            key={index}
            className={item.className}
            leftSideContent={<p>{item.text}</p>}
            rightSideContent={
              <>
                <p>{item.value}</p>
                {item?.icon && (
                  <div className="w-[18px]">
                    <Image
                      src={item.icon.src}
                      width={item.icon.width}
                      height={item.icon.height}
                      alt={item.icon.alt}
                    />
                  </div>
                )}
              </>
            }
          />
        ))}
      </ul>
    </section>
  );
};

interface Props {
  leftSideContent: ReactNode;
  rightSideContent: ReactNode;
  className?: string;
}

export const WarpStatsItem = ({
  leftSideContent,
  rightSideContent,
  className,
}: Props) => {
  return (
    <li className={clsx("flex items-center justify-between py-0.5", className)}>
      <div>{leftSideContent}</div>
      <div className="gap- flex items-center gap-0.5">{rightSideContent}</div>
    </li>
  );
};
