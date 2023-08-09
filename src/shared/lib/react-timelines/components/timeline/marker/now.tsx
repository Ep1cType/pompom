import React from "react";

import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";
import { getDayMonth } from "shared/lib/react-timelines/utils/format-date";
import { Marker } from "shared/lib/react-timelines/components/timeline/marker/index";

type Props = {
  time: CreateTimeReturn;
  now: Date;
  visible: boolean;
};

//TODO: Поменять локаль
export const NowMarker = ({ time, now, visible }: Props) => {
  return (
    <Marker modifier="now" x={time.toX(now)} visible={visible}>
      <div>
        <div>Сегодня</div>
        <strong>{getDayMonth(now as unknown as Date)}</strong>
      </div>
    </Marker>
  );
};
