import React, { CSSProperties } from "react";
import { Cell } from "shared/lib/react-timelines/components/timeline/timebar/cell";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";
import { TimeBarCell } from "shared/lib/react-timelines/types";

type Props = {
  time: CreateTimeReturn;
  cells: TimeBarCell[];
  style: CSSProperties;
};

export const Row = ({ time, cells, style }: Props) => {
  return (
    <div className="rt-timebar__row relative h-[25px]" style={style}>
      {cells.map((cell) => (
        <Cell key={cell.id} time={time} {...cell} />
      ))}
    </div>
  );
};
