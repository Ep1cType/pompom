import React from "react";

import { Marker } from "shared/lib/react-timelines/components/timeline/marker/index";
import { getDayMonth } from "shared/lib/react-timelines/utils/format-date";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";

type Props = {
  time: CreateTimeReturn;
  date: Date;
  visible: boolean;
  highlighted: boolean;
};

export const PointerMarker = ({ time, date, visible, highlighted }: Props) => (
  <Marker
    modifier="pointer"
    x={time.toX(date)}
    visible={visible}
    highlighted={highlighted}
  >
    <div>
      <div>
        <strong>{getDayMonth(date as unknown as Date)}</strong>
      </div>
    </div>
  </Marker>
);
