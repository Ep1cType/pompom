import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { ImageDataResponse } from "shared/api/types";
import { CharacterElementList } from "shared/api/character/type";
import Link from "next/link";

type Props = {
  name: string;
  img: ImageDataResponse;
  starCount: "four" | "five";
  element: CharacterElementList;
  className?: string;
};

export const CharacterCard = ({
  img,
  name,
  starCount,
  element,
  className,
}: Props) => {
  return (
    <div className={clsx("group card relative", className)}>
      <div
        className={clsx(
          "aspect-square overflow-hidden",
          starCount === "four" &&
            "bg-gradient-to-b from-[#3F4064] to-[#9C65D7]",
          starCount === "five" &&
            "bg-gradient-to-b from-[#A35D55] to-[#D0AA6E]",
        )}
      >
        <Image
          className="h-auto w-full object-contain object-bottom transition-all duration-100 ease-linear group-hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_API_URL}${img.url}`}
          width={img.width}
          height={img.height}
          alt={img.name}
        />
      </div>
      <div className="absolute right-0 top-0 flex aspect-square h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-black">
        <Image
          className="h-5 w-5"
          src={`/icons/elements/${element}.webp`}
          width={256}
          height={256}
          alt={`${element} icon`}
        />
      </div>
      <h2
        title={name}
        className="mt-1 text-center text-xs/none sm:text-sm md:text-base/tight"
      >
        {name}
        <Link className="absolute inset-0" href={`/characters/${name}`} />
      </h2>
    </div>
  );
};
