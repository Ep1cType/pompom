import React, { MouseEvent, useState } from "react";

import { NowMarker } from "shared/lib/react-timelines/components/timeline/marker/now";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";
import { PointerMarker } from "shared/lib/react-timelines/components/timeline/marker/pointer";
import { TimeBarItem, TrackItem } from "shared/lib/react-timelines/types";
import { getGrid } from "shared/lib/react-timelines/utils/get-grid";
import { TimelineHeader } from "shared/lib/react-timelines/components/timeline/header";
import { TimelineBody } from "shared/lib/react-timelines/components/timeline/body";
import { StickyObject } from "shared/lib/react-timelines/components/layout";
import { getMouseX } from "shared/lib/react-timelines/utils/get-mouse-x";

type Props = {
  now: Date;
  time: CreateTimeReturn;
  timebar: TimeBarItem[];
  tracks: TrackItem[];
  sticky: StickyObject;
  clickElement?: (any: any) => void;
};

export const TimelineMain = ({
  now,
  time,
  timebar,
  tracks,
  sticky,
  clickElement,
}: Props) => {
  const grid = getGrid(timebar);

  return (
    <div
      className="rt-timeline relative"
      style={{ width: time.timelineWidthStyle }}
    >
      {now && <NowMarker now={now} visible time={time} />}
      <TimelineHeader
        time={time}
        timebar={timebar}
        width={time.timelineWidthStyle}
        sticky={sticky}
      />
      <TimelineBody
        time={time}
        grid={grid}
        tracks={tracks}
        clickElement={clickElement}
      />
    </div>
  );
};
