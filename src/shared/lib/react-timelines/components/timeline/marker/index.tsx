import React, { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  modifier: "now" | "pointer";
  x: number;
  visible: boolean;
  highlighted?: boolean;
};

export const Marker = ({
  x,
  modifier,
  children,
  visible,
  highlighted,
}: Props) => (
  <div
    className={clsx(
      `timeline_marker rt-marker rt-marker--${modifier}`,
      visible && "timeline_marker__visible rt-is-visible",
      highlighted && "rt-is-highlighted",
    )}
    style={{ left: `${x}px` }}
  >
    <div className="timeline_marker__label">
      <div className="timeline_marker__content">{children}</div>
    </div>
  </div>
);
