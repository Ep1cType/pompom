import React from "react";

import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import { Character } from "shared/api/character/type";

type Props = {
  character: Character;
  className?: string;
};

export const CharacterCard = ({ character, className }: Props) => {
  return (
    <div
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
      className={clsx("group relative", className)}
    >
      <div
        itemScope
        itemType="https://schema.org/ImageObject"
        className={clsx(
          "aspect-square overflow-hidden",
          character.star === "four" && "bg-gradient-to-b from-[#3F4064] to-[#9C65D7]",
          character.star === "five" && "bg-gradient-to-b from-[#A35D55] to-[#D0AA6E]",
        )}
      >
        <Image
          itemProp="contentUrl"
          className="h-auto w-full object-contain object-bottom transition-all duration-100 ease-linear group-hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_API_URL}${character.icon.formats.thumbnail.url}`}
          width={character.icon.formats.thumbnail.width}
          height={character.icon.formats.thumbnail.height}
          alt={character.icon.formats.thumbnail.name}
        />
        <meta itemProp="name" content={character.name} />
      </div>
      <div className="absolute right-0 top-0 flex aspect-square h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-black">
        <Image
          className="h-5 w-5"
          src={`/icons/elements/${character.element}.webp`}
          width={20}
          height={20}
          alt={`${character.element} icon`}
        />
      </div>
      <h2
        itemProp="name"
        title={character.name}
        className="mt-1 text-center text-xs/none sm:text-sm md:text-base/tight"
      >
        {character.name}
        <Link itemProp="url" className="absolute inset-0" href={`/characters/${character.slug}`} />
      </h2>
    </div>
  );
};
