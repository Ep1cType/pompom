import React, { createRef, MouseEventHandler, useEffect } from "react";

import { CreateTimeReturn } from "shared/lib/react-timelines/utils/time";
import { Timebar } from "shared/lib/react-timelines/components/timeline/timebar";
import { TimeBarItem } from "shared/lib/react-timelines/types";
import { StickyObject } from "shared/lib/react-timelines/components/layout";

const noop = () => {};

type Props = {
  time: CreateTimeReturn;
  timebar: TimeBarItem[];
  width: string;
  sticky: StickyObject;
};

export const TimelineHeader = ({
  time,
  timebar: rows,
  width,
  sticky,
}: Props) => {
  const scrollRef = createRef<HTMLDivElement>();
  const timebarRef = createRef<HTMLDivElement>();

  const {
    isSticky,
    headerHeight,
    viewportWidth,
    setHeaderHeight,
    scrollLeft,
    handleHeaderScrollY,
  } = sticky;

  useEffect(() => {
    if (timebarRef.current) {
      setHeaderHeight(timebarRef.current.offsetHeight);
    }
    if (scrollRef.current) {
      if (isSticky) {
        scrollRef.current.scrollLeft = scrollLeft;
      }
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft, isSticky]);

  function handleScroll() {
    if (scrollRef.current) {
      handleHeaderScrollY(scrollRef.current.scrollLeft);
    }
  }

  return (
    <div style={isSticky ? { paddingTop: headerHeight } : {}}>
      <div
        className={`rt-timeline__header ${isSticky ? "rt-is-sticky" : ""}`}
        style={isSticky ? { width: viewportWidth, height: headerHeight } : {}}
      >
        {/*<div className='overflow-x-auto rt-timeline__header-scroll' ref={scrollRef} onScroll={isSticky ? handleScroll : undefined}>*/}
        <div
          className="rt-timeline__header-scroll"
          ref={scrollRef}
          onScroll={isSticky ? handleScroll : undefined}
        >
          <div ref={timebarRef} style={isSticky ? { width } : {}}>
            <Timebar time={time} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
};
