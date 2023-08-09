import React, { HTMLAttributes } from "react";
import { BasicElement } from "shared/lib/react-timelines/components/elements/basic";
import { TrackItem } from "shared/lib/react-timelines/types";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";
import { ImageDataResponse } from "shared/api/types";

interface Props extends TrackItem {
  time: CreateTimeReturn;
  clickElement?: (any: any) => void;
  tooltip?: string;
  classes?: string[];
  dataSet?: HTMLAttributes<HTMLDivElement>;
  image?: ImageDataResponse;
  link?: string;
}

export const Element = (props: Props) => {
  const {
    time,
    style,
    title,
    start,
    end,
    classes,
    dataSet,
    tooltip,
    clickElement,
    image,
    link,
  } = props;
  const handleClick = () => {
    if (clickElement) {
      clickElement(props);
    }
  };

  const elementStyle = {
    ...time.toStyleLeftAndWidth(start, end),
    ...(clickElement ? { cursor: "pointer" } : {}),
  };

  return (
    <div
      className="rt-track__element absolute top-[10px] z-10 h-[40px] cursor-pointer"
      style={elementStyle}
      onClick={clickElement ? handleClick : undefined}
    >
      <BasicElement
        title={title}
        start={start}
        end={end}
        style={style}
        classes={classes}
        dataSet={dataSet}
        tooltip={tooltip}
        image={image}
        link={link}
      />
    </div>
  );
};
