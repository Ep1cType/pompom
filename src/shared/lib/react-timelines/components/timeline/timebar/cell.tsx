import React from "react";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";
import { TimeBarCell } from "shared/lib/react-timelines/types";
import clsx from "clsx";

interface Props extends TimeBarCell {
  time: CreateTimeReturn;
}

export const Cell = ({ time, ...props }: Props) => {
  if (props.id.toString().includes("m")) {
    return (
      <div
        className={clsx(
          "rt-timebar__cell absolute border-l px-2.5  text-white ",
        )}
        style={time.toStyleLeftAndWidth(props.start, props.end)}
      >
        <span className="sticky left-2.5">{props.title}</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "rt-timebar__cell absolute border-l border-l-transparent text-center text-white",
      )}
      style={time.toStyleLeftAndWidth(props.start, props.end)}
    >
      <span className="sticky left-0">{props.title}</span>
    </div>
  );
};
