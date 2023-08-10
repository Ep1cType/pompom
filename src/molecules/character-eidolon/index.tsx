import React from "react";
import {
  CharacterEidolonItem,
  CharacterElementList,
} from "shared/api/character/type";
import { ImageWithDomain } from "shared/ui/image-with-domain";
import { checkImageFormat } from "shared/api/model";
import { getColorByCharElement } from "shared/utils/get-color-by-char-element";

interface Props {
  eidolon: CharacterEidolonItem;
  element: CharacterElementList;
}

export const CharacterEidolon = ({ eidolon, element }: Props) => {
  const imageFormat = eidolon.image?.data?.attributes
    ? checkImageFormat(eidolon.image.data.attributes.formats)
    : "thumbnail";
  const eidolonImage = eidolon?.image?.data?.attributes?.formats?.[imageFormat];
  const eidolonImageAlt = eidolon?.image?.data?.attributes?.name;

  return (
    <li className="relative flex items-center self-start">
      <ImageWithDomain
        className="h-36 w-36 drop-shadow-eidolon"
        src={eidolonImage?.url}
        width={eidolonImage?.width}
        height={eidolonImage?.height}
        quality={100}
        alt={eidolonImageAlt}
      />
      <div className="rounded-2xl bg-blue-900 p-4">
        <h3 className="mb-1 text-base font-bold">
          <span className={getColorByCharElement(element, "text")}>
            {eidolon.number}
          </span>{" "}
          {eidolon.name}
        </h3>
        <p
          className="text-base/snug [&>span]:font-bold"
          dangerouslySetInnerHTML={{
            __html: Object.values(eidolon.description)[0],
          }}
        />
      </div>
    </li>
  );
};
