import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { createClasses } from "shared/lib/react-timelines/utils/classes";
import { ImageDataResponse } from "shared/api/types";
import { ImageWithDomain } from "shared/ui/image-with-domain";

const buildDataAttributes = (
  attributes: HTMLAttributes<HTMLDivElement> = {},
) => {
  const value: HTMLAttributes<HTMLDivElement> = {};
  Object.keys(attributes).forEach((name) => {
    // @ts-ignore
    value[`data-${name}`] = attributes[name];
  });
  return value;
};

type Props = {
  title: ReactNode;
  start: Date;
  end: Date;
  style: CSSProperties;
  classes?: string[];
  dataSet?: HTMLAttributes<HTMLDivElement>;
  tooltip?: string;
  image?: ImageDataResponse;
  link?: string;
};

export const BasicElement = ({
  title,
  start,
  end,
  style,
  classes,
  dataSet,
  tooltip,
  image,
  link,
}: Props) => {
  return (
    <div
      className={createClasses(
        "rt-element bg-orange-500 group relative h-[40px] text-center leading-[40px] text-white",
        classes,
      )}
      style={{
        ...style,
        // backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${image?.url})`
      }}
      {...buildDataAttributes(dataSet)}
    >
      <div
        className="rt-element__content text-ellipsis whitespace-nowrap px-[10px] text-start"
        aria-hidden="true"
      >
        <span
          style={{
            textShadow: `${style?.backgroundColor as string} -1px -1px 4px,${
              style?.backgroundColor as string
            } 1px -1px 4px,${style?.backgroundColor as string} -1px 1px 4px,${
              style?.backgroundColor as string
            } 1px 1px 4px,${style?.backgroundColor as string} 0 0 10px`,
          }}
          className="sticky left-[10px] z-10 whitespace-nowrap text-base font-bold md:text-lg"
        >
          {title}
        </span>
      </div>
      <div className="timeline_cell__image absolute bottom-0 right-0 top-0 w-[30%] max-w-[20%] overflow-hidden rounded-r-[13px]">
        {image && (
          <ImageWithDomain
            className="h-full w-full scale-150 object-cover"
            src={image?.url}
            width={image?.width}
            height={image?.height}
            alt={image?.name}
          />
        )}
      </div>
    </div>
  );
};
