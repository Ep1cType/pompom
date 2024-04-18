import React, { useEffect, useState } from "react";

import { Layout } from "shared/lib/react-timelines/components/layout";
import { createTime } from "shared/lib/react-timelines/utils/time";

const UNKNOWN_WIDTH = -1;

export type Scale = {
  start: Date;
  end: Date;
  zoom: number;
  zoomMin: number;
  zoomMax: number;
  minWidth?: number;
  viewportWidth?: number;
};

type Props = {
  scale: Scale;
  isOpen: boolean;
  toggleOpen: () => void;
  zoomIn?: () => void;
  zoomOut?: () => void;
  clickElement: (any: any) => void;
  timebar: any[]; //PropTypes.arrayOf(PropTypes.shape({})).isRequired
  tracks: any[]; //PropTypes.arrayOf(PropTypes.shape({})).isRequired
  now: Date; //PropTypes.instanceOf(Date),
  enableSticky: boolean;
  scrollToNow: boolean;
};

export interface HandleLayoutChange {
  timelineViewportWidth: number;
  sidebarWidth: number;
  callback?: any;
}

export const TimeLine = ({ scale, enableSticky, now, tracks, timebar, scrollToNow, isOpen, clickElement }: Props) => {
  const [timelineViewportWidth, setTimelineViewportWidth] = useState(UNKNOWN_WIDTH);
  const [sidebarWidth, setSidebarWidth] = useState(UNKNOWN_WIDTH);
  const [time, setTime] = useState(createTime({ ...scale, viewportWidth: timelineViewportWidth }));

  useEffect(() => {
    const newTime = createTime({
      ...scale,
      viewportWidth: timelineViewportWidth,
    });
    setTime(newTime);
  }, [scale, timelineViewportWidth]);

  function handleLayoutChange({ timelineViewportWidth, sidebarWidth, callback }: HandleLayoutChange) {
    const time = createTime({ ...scale, viewportWidth: timelineViewportWidth });
    setTime(time);
    setTimelineViewportWidth(timelineViewportWidth);
    setSidebarWidth(sidebarWidth);
    callback();
  }

  return (
    <div className="relative z-[1]">
      <Layout
        enableSticky={enableSticky}
        now={now}
        tracks={tracks}
        timebar={timebar}
        scrollToNow={scrollToNow}
        time={time}
        isOpen={isOpen}
        onLayoutChange={handleLayoutChange}
        timelineViewportWidth={timelineViewportWidth}
        sidebarWidth={sidebarWidth}
        clickElement={clickElement}
      />
    </div>
  );
};
