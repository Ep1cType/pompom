import React, { useState } from "react";
import { WarpItem } from "shared/api/warp/types";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { Badge, BadgeProps } from "shared/ui/badge";

type Props = {
  warp: WarpItem;
  count: number;
  short?: boolean;
  number?: number;
};

export const WarpCard = ({ warp, count, short, number }: Props) => {
  const [showImage, setShowImage] = useState(true);

  return (
    <Link
      data-id={warp.item_id}
      href={warp.item_type === "Персонажи" ? `/characters/${warp.name}` : ""}
      className={clsx(
        "flex hover:opacity-80",
        "flex items-center gap-2",
        warp.rank_type === "3" && "text-three-from",
        warp.rank_type === "4" && "text-four-from",
        warp.rank_type === "5" && "text-five-from",
        short && "w-fit flex-col",
      )}
    >
      {!short && count}
      {showImage && (
        <Image
          className={clsx(
            "aspect-square w-12 min-w-[48px]",
            warp.item_type === "Персонажи"
              ? "rounded-full object-cover"
              : "object-contain",
          )}
          width={256}
          height={256}
          src={`/${
            warp.item_type === "Персонажи"
              ? `characters/${warp.item_id}.webp`
              : `cones/${warp.item_id}.webp`
          }`}
          onError={() => setShowImage(false)}
          alt={warp.name}
        />
      )}
      <p className={clsx("inline text-base", short && "whitespace-nowrap")}>
        {warp.name}
      </p>
      {number}
    </Link>
  );
};

interface FiveStarCardProps extends Props {
  badgeColor: BadgeProps["intent"];
}

export const FiveStarCard = ({
  warp,
  count,
  short,
  number,
  badgeColor,
}: FiveStarCardProps) => {
  return (
    <div className="min-h-14 flex items-center gap-2 p-2">
      <div className="relative">
        <Image
          className={clsx(
            "h-12 w-12",
            warp.item_type === "Персонажи"
              ? "rounded-full object-cover"
              : "object-contain",
          )}
          width={256}
          height={256}
          src={`/${
            warp.item_type === "Персонажи"
              ? `characters/${warp.item_id}.webp`
              : `cones/${warp.item_id}.webp`
          }`}
          alt={warp.name}
        />
        <Badge intent={badgeColor} pos="bottom-right">
          {number}
        </Badge>
      </div>
      <div className="bg-badge text-base text-five-from">
        <p>{warp.name}</p>
      </div>
    </div>
  );
};
