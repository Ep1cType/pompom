import { MouseEvent } from "react";

export const getMouseX = (e: MouseEvent) => {
  const target = e.currentTarget;
  const bounds = target.getBoundingClientRect();
  return e.clientX - bounds.left;
};
