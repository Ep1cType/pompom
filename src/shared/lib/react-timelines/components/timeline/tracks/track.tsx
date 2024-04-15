import React from "react";

import { Element } from "shared/lib/react-timelines/components/timeline/tracks/element";
import { Tracks } from "shared/lib/react-timelines/components/timeline/tracks/index";
import { TrackItem } from "shared/lib/react-timelines/types";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";

type Props = {
  time: CreateTimeReturn;
  tracks?: TrackItem[];
  clickElement?: (any: any) => void;
  elements: TrackItem[];
  isOpen?: boolean;
};

export const Track = ({ time, elements, isOpen, tracks, clickElement }: Props) => {
  return (
    <div className="tr-track">
      <div className="rt-track__elements relative h-[50px] bg-blue-950">
        {elements
          .filter(({ start, end }) => end > start)
          .map((element) => (
            <Element key={element.id} time={time} clickElement={clickElement} {...element} />
          ))}
      </div>
      {isOpen && tracks && tracks.length > 0 && <Tracks time={time} tracks={tracks} clickElement={clickElement} />}
    </div>
  );
};
