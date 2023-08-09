import React from "react";

import { Grid } from "shared/lib/react-timelines/components/timeline/grid";
import { Tracks } from "shared/lib/react-timelines/components/timeline/tracks";
import { TimeBarCell, TrackItem } from "shared/lib/react-timelines/types";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";

type Props = {
  time: CreateTimeReturn;
  tracks: TrackItem[];
  grid?: TimeBarCell[];
  clickElement?: (any: any) => void;
};

export const TimelineBody = ({ time, grid, tracks, clickElement }: Props) => (
  <div className="relative bg-white">
    {grid && <Grid time={time} grid={grid} />}
    <Tracks time={time} tracks={tracks} clickElement={clickElement} />
  </div>
);
