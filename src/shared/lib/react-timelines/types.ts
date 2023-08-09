import { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface TimeBarItem {
  id: string | number;
  title: ReactNode;
  useAsGrid?: boolean;
  cells: TimeBarCell[];
  style: CSSProperties;
}

export interface TimeBarCell {
  id: string | number;
  title: ReactNode;
  start: Date;
  end: Date;
}

export interface StickyObject {
  isSticky: boolean;
  headerHeight: number;
  sidebarWidth?: number;
}

export interface TrackItem {
  id: string | number;
  start: Date;
  end: Date;
  title: ReactNode;
  isOpen?: boolean;
  elements: TrackItem[];
  style: CSSProperties;
  tooltip?: string;
  dataSet?: HTMLAttributes<HTMLDivElement>;
  tracks?: TrackItem[];
}
