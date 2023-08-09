import React from "react";
import { ImageWithDomain } from "shared/ui/image-with-domain";
import { Guide } from "shared/api/guide/type";
import { ResponseDataItem } from "shared/api/types";
import { useRouter } from "next/router";

type Props = {
  guide: ResponseDataItem<Guide>;
};

export const GuideCard = ({ guide }: Props) => {
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/guides/${guide.attributes.slug}`)}
      className="group cursor-pointer rounded-xl bg-blue-900 p-4 md:rounded-2xl"
    >
      <div className="relative mb-4 h-[212px] overflow-hidden rounded-xl md:h-[407px] md:rounded-2xl">
        <ImageWithDomain
          className="absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-125"
          src={guide.attributes.cover.data.attributes.url}
          width={guide.attributes.cover.data.attributes.width}
          height={guide.attributes.cover.data.attributes.height}
          alt={guide.attributes.cover.data.attributes.name}
        />
      </div>
      <time dateTime={guide.attributes.updatedAt}>
        {new Date(guide.attributes.updatedAt).toLocaleDateString()}
      </time>
      <h2 className="text-lg group-hover:opacity-80 md:text-xl">
        {guide.attributes.title}
      </h2>
    </article>
  );
};
