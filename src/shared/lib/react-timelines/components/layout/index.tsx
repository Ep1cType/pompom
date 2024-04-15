import React, { Dispatch, SetStateAction, createRef, useEffect, useState } from "react";

import clsx from "clsx";

import { HandleLayoutChange } from "shared/lib/react-timelines";
import { TimelineMain } from "shared/lib/react-timelines/components/timeline";
import { TimeBarItem, TrackItem } from "shared/lib/react-timelines/types";
import { getNumericPropertyValue } from "shared/lib/react-timelines/utils/get-numeric-property-value";
import { raf } from "shared/lib/react-timelines/utils/raf";
import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";

type Props = {
  enableSticky: boolean;
  timebar: TimeBarItem[]; //PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  time: CreateTimeReturn; //PropTypes.shape({toX: PropTypes.func.isRequired,}).isRequired
  tracks: TrackItem[]; //PropTypes.arrayOf(PropTypes.shape({})).isRequired
  now: Date; //PropTypes.instanceOf(Date)
  isOpen?: boolean;
  scrollToNow?: boolean;
  onLayoutChange: (props: HandleLayoutChange) => void;
  sidebarWidth?: number;
  timelineViewportWidth: number;
  clickElement?: (any: any) => void;
};

export interface StickyObject {
  isSticky: boolean;
  setHeaderHeight: Dispatch<SetStateAction<number>>;
  viewportWidth: number;
  handleHeaderScrollY: (num: number) => void;
  headerHeight: number;
  scrollLeft: number;
}

export const Layout = ({
  enableSticky,
  onLayoutChange,
  sidebarWidth,
  timelineViewportWidth,
  clickElement,
  tracks,
  now,
  scrollToNow,
  isOpen,
  timebar,
  time,
}: Props) => {
  const timelineRef = createRef<HTMLDivElement>();
  const layoutRef = createRef<HTMLDivElement>();
  const sidebarRef = createRef<HTMLDivElement>();

  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  function updateTimelineHeaderScroll() {
    if (timelineRef.current) {
      const { scrollLeft } = timelineRef.current;
      setScrollLeft(scrollLeft);
    }
  }

  function updateTimelineBodyScroll() {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = scrollLeft;
    }
  }

  useEffect(() => {
    function wheelEvent(event: WheelEvent) {
      event.preventDefault();
      timelineRef.current?.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
      });
    }

    if (timelineRef.current) {
      timelineRef.current.addEventListener("wheel", wheelEvent, { passive: true });
    }

    return () => {
      timelineRef.current && timelineRef.current.removeEventListener("wheel", wheelEvent);
    };
  }, [timelineRef]);

  function calculateSidebarWidth() {
    if (sidebarRef.current) {
      return sidebarRef.current.offsetWidth + getNumericPropertyValue(layoutRef.current as Element, "margin-left");
    }
  }

  function calculateTimelineViewportWidth() {
    if (timelineRef.current) {
      return timelineRef.current.offsetWidth;
    }
  }

  //TODO: CHANGE COEFFICIENT
  function handleScrollToNow() {
    if (scrollToNow) {
      if (timelineRef.current) {
        // timelineRef.current.scrollLeft = time.toX(now) - 0.5 * timelineViewportWidth;
        timelineRef.current.scrollLeft = time.toX(now) - time.toX(now) / 6;
      }
    }
  }

  function handleScrollX() {
    raf(updateTimelineHeaderScroll);
  }

  function handleHeaderScrollY(scrollLeft: number) {
    raf(() => {
      setScrollLeft(scrollLeft);
    });
  }

  useEffect(() => {
    function handleScrollY() {
      raf(() => {
        const markerHeight = 0;
        if (timelineRef.current) {
          const { top, bottom } = timelineRef.current.getBoundingClientRect();
          const isSticky = top <= -markerHeight && bottom >= headerHeight;
          setIsSticky(isSticky);
        }
      });
    }

    if (enableSticky) {
      window.addEventListener("scroll", handleScrollY);
      updateTimelineHeaderScroll();
      updateTimelineBodyScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  function handleLayoutChange() {
    if (timelineRef.current) {
      const nextSidebarWidth = calculateSidebarWidth();
      const nextTimelineViewportWidth = calculateTimelineViewportWidth();
      if (nextSidebarWidth !== sidebarWidth || nextTimelineViewportWidth !== timelineViewportWidth) {
        onLayoutChange({
          sidebarWidth: calculateSidebarWidth() as number,
          timelineViewportWidth: calculateTimelineViewportWidth() as number,
        });
      }
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleLayoutChange);
    handleScrollToNow();

    return () => window.removeEventListener("resize", handleLayoutChange);
  }, []);

  useEffect(() => {
    if (enableSticky && isSticky) {
      updateTimelineHeaderScroll();
      updateTimelineBodyScroll();
      handleLayoutChange();
    }
  }, [isSticky, scrollLeft, isOpen]);
  return (
    <div className={clsx(" rt-layout", isOpen && "rt-is-open")} ref={layoutRef}>
      <div className="rt-layout__main inline-block w-[calc(100%)] align-top">
        <div
          className="scrollBar rt-layout__timeline overflow-x-auto"
          ref={timelineRef}
          onScroll={isSticky ? handleScrollX : undefined}
        >
          <TimelineMain
            now={now}
            time={time}
            timebar={timebar}
            tracks={tracks}
            sticky={{
              isSticky,
              setHeaderHeight: setHeaderHeight,
              viewportWidth: timelineViewportWidth,
              handleHeaderScrollY: handleHeaderScrollY,
              headerHeight,
              scrollLeft,
            }}
            clickElement={clickElement}
          />
        </div>
      </div>
    </div>
  );
};
