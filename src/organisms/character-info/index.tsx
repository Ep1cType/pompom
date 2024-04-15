"use client";

import Image from "next/image";

import { elements } from "features/tooltips/model/elements";
import { paths } from "features/tooltips/model/paths";

import { CharacterEidolon } from "molecules/character-eidolon";
import { CharacterSkill } from "molecules/character-skill";

import { CharacterExtend } from "shared/api/character/type";
import { checkImageFormat } from "shared/api/model";
import { ImageWithDomain } from "shared/ui/image-with-domain";
import { elementDictionary, pathDictionary } from "shared/utils/dictionary";

type Props = {
  characterInfo: CharacterExtend;
};

export const CharacterInfo = ({ characterInfo }: Props) => {
  const starCount = characterInfo.star === "five" ? 5 : 4;
  const imageFormat = characterInfo.info?.image ? checkImageFormat(characterInfo.info.image.formats) : "thumbnail";
  const splashImage = characterInfo.info?.image?.formats?.[imageFormat];

  return (
    <div itemScope itemType="https://schema.org/Person" className="container mx-auto px-4 py-8 font-montserrat">
      <section className="mb-4 flex flex-col-reverse justify-between gap-3 md:mb-8 md:flex-row md:items-center">
        <div className="md:max-w-[50%]">
          <h1 itemProp="name" className="mb-2 text-4xl">
            {characterInfo.name}
          </h1>

          <p itemScope itemType="https://schema.org/Rating" className="mb-4">
            <meta itemProp="worstRating" content="4" />
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="ratingValue" content={String(starCount)} />
            {[...Array(starCount)].map((_, index) => (
              <Image
                key={index}
                className="mr-2 inline h-4 w-4"
                src={`/icons/common/level_star.png`}
                width={42}
                height={42}
                alt={`${characterInfo.path} icon`}
              />
            ))}
          </p>

          <p className="mb-2 flex items-center">
            <span className="mr-2 text-base font-medium">Путь:</span>
            <Image
              className="mr-2 inline h-5 w-5"
              src={`/icons/paths/${characterInfo.path}.png`}
              width={108}
              height={108}
              alt={`${characterInfo.path} icon`}
            />
            <span
              data-tooltip-id="tooltip-info"
              data-tooltip-html={paths[characterInfo.path]}
              className="cursor-pointer underline opacity-80"
            >
              {pathDictionary[characterInfo.path]}
            </span>
          </p>

          <p className="mb-2 flex items-center">
            <span className="mr-2 text-base font-medium">Тип:</span>
            <Image
              className="mr-2 inline h-5 w-5"
              src={`/icons/elements/${characterInfo.element}.webp`}
              width={256}
              height={256}
              alt={`${characterInfo.element} icon`}
            />
            <span
              data-tooltip-id="tooltip-info"
              data-tooltip-html={elements[characterInfo.element]}
              className="cursor-pointer underline opacity-80"
            >
              {elementDictionary[characterInfo.element]}
            </span>
          </p>

          <p itemProp="description" className="text-lg/tight">
            {characterInfo.info?.story}
          </p>
        </div>

        {splashImage && (
          <div itemScope itemProp="image" itemType="https://schema.org/ImageObject" className="md:max-w-[50%]">
            <meta itemProp="name" content={characterInfo.name} />
            <meta />
            <ImageWithDomain
              src={splashImage?.url}
              width={splashImage?.width}
              height={splashImage?.height}
              quality={100}
              priority
              itemProp="contentUrl"
              alt={characterInfo.info.image.name}
            />
          </div>
        )}
      </section>
      {characterInfo.info?.main_skill?.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-medium">Навыки</h2>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            {characterInfo.info.main_skill.map((skill) => (
              <CharacterSkill key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {characterInfo.info?.eidolon?.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-medium">Эйдолоны</h2>
          <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            {characterInfo.info.eidolon.map((eidolon) => (
              <CharacterEidolon key={eidolon.id} eidolon={eidolon} element={characterInfo.element} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
