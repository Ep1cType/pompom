import React from "react";
import { ResponseDataItem } from "shared/api/types";
import { Guide } from "shared/api/guide/type";
import { ImageWithDomain } from "shared/ui/image-with-domain";
import Markdown from "marked-react";

type Props = {
  guidePage: ResponseDataItem<Guide>;
};

export const GuideInfo = ({ guidePage }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl md:text-5xl">
        {guidePage.attributes.title}
      </h1>
      {guidePage.attributes.body.map((section) => (
        <section key={section.id}>
          {section.images.data?.map((el) => (
            <ImageWithDomain
              key={el.id}
              src={el.attributes.url}
              width={el.attributes.width}
              height={el.attributes.height}
              alt={el.attributes.name}
            />
          ))}
          {section.text && <Markdown>{section.text}</Markdown>}
        </section>
      ))}
    </div>
  );
};
