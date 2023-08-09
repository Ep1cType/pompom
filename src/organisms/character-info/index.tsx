import React from "react";
import { ResponseDataItem } from "shared/api/types";
import { CharacterExtend } from "shared/api/character/type";
import { ImageWithDomain } from "shared/ui/image-with-domain";
import { CharacterSkill } from "molecules/character-skill";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { checkImageFormat } from "shared/api/model";

type Props = {
  characterInfo: ResponseDataItem<CharacterExtend>;
};

export const CharacterInfo = ({ characterInfo }: Props) => {
  const { t } = useTranslation(["character"]);

  const starCount = characterInfo.attributes.star === "five" ? 5 : 4;
  const imageFormat = characterInfo.attributes.info?.image?.data?.attributes
    ? checkImageFormat(
        characterInfo.attributes.info.image.data.attributes.formats,
      )
    : "thumbnail";
  const splashImage =
    characterInfo.attributes.info?.image?.data?.attributes?.formats?.[
      imageFormat
    ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-4 flex flex-col-reverse items-center justify-between gap-3 md:mb-8 md:flex-row">
        <div className="md:max-w-[50%]">
          <h1 className="text-4xl">{characterInfo.attributes.name}</h1>

          <p className="mb-8">
            {[...Array(starCount)].map((_, index) => (
              <Image
                key={index}
                className="mr-2 inline h-4 w-4"
                src={`/icons/common/level_star.png`}
                width={42}
                height={42}
                alt={`${characterInfo.attributes.path} icon`}
              />
            ))}
          </p>

          <p className="mb-2 flex items-center">
            <span className="mr-2 text-base font-medium">
              {t("path.title", { ns: "character" })}:
            </span>
            <Image
              className="mr-2 inline h-5 w-5"
              src={`/icons/paths/${characterInfo.attributes.path}.png`}
              width={108}
              height={108}
              alt={`${characterInfo.attributes.path} icon`}
            />{" "}
            <span className="opacity-80">
              {t(`path.${characterInfo.attributes.path}`, { ns: "character" })}
            </span>
          </p>

          <p className="mb-2 flex items-center">
            <span className="mr-2 text-base font-medium">
              {t("element.title", { ns: "character" })}:
            </span>
            <Image
              className="mr-2 inline h-5 w-5"
              src={`/icons/elements/${characterInfo.attributes.element}.webp`}
              width={256}
              height={256}
              alt={`${characterInfo.attributes.element} icon`}
            />{" "}
            <span className="opacity-80">
              {t(`element.${characterInfo.attributes.element}`, {
                ns: "character",
              })}
            </span>
          </p>

          <p className="text-lg/tight">
            {characterInfo.attributes.info?.story}
          </p>
        </div>
        {splashImage && (
          <ImageWithDomain
            className="md:max-w-[50%]"
            src={splashImage?.url}
            width={splashImage?.width}
            height={splashImage?.height}
            quality={100}
            priority
            alt={characterInfo.attributes.info.image.data.attributes.name}
          />
        )}
      </section>
      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-medium">Навыки</h2>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
          {characterInfo.attributes.info?.main_skill?.map((skill) => (
            <CharacterSkill key={skill.id} skill={skill} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-medium">Эйдолоны</h2>
      </section>
    </div>
  );
};
