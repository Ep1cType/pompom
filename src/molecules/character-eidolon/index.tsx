"use client";

import { CharacterEidolonItem, CharacterElement } from "shared/api/character/type";
import { checkImageFormat } from "shared/api/model";
import { ImageWithDomain } from "shared/ui/image-with-domain";
import { getColorByCharElement } from "shared/utils/get-color-by-char-element";

interface Props {
  eidolon: CharacterEidolonItem;
  element: CharacterElement;
}

export const CharacterEidolon = ({ eidolon, element }: Props) => {
  const imageFormat = eidolon.image ? checkImageFormat(eidolon.image.formats) : "thumbnail";
  const eidolonImage = eidolon?.image?.formats?.[imageFormat];
  const eidolonImageAlt = eidolon?.image?.name;

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
          <span className={getColorByCharElement(element, "text")}>{eidolon.number}</span> {eidolon.name}
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
