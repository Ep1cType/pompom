"use client";

import { useState } from "react";

import { setTimelineModalData } from "organisms/timeline-modal/model";
import { TrackElement } from "organisms/timeline-modal/type";

import { EventItem } from "shared/api/event/type";
import { ResponseDataItem } from "shared/api/types";
import { TimeLine } from "shared/lib/react-timelines";

const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function getMonthDate(year: number, month: number) {
  return new Date(year, month);
}

const MIN_ZOOM = 2;
const MAX_ZOOM = 50;

function subtractMonths(currentDate: Date, month: number) {
  const newDate = new Date(currentDate);
  newDate.setMonth(newDate.getMonth() - month);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function getFirstDayOfMonth(date: Date) {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth(), 1);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function getLastDayOfMonth(date: Date) {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1, 0);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function getDaysInRange(startDate: Date, endDate: Date) {
  const date = new Date(startDate.getTime());
  const datesList = [];

  while (date <= endDate) {
    datesList.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return datesList;
}

function buildMonthsCells(dateRange: Date[]) {
  return dateRange.map((date, index) => ({
    id: `m${index}`,
    title: MONTH_NAMES[date.getMonth() % 12],
    start: getFirstDayOfMonth(date),
    end: getMonthDate(date.getFullYear(), date.getMonth() + 1),
  }));
}

function getDatesInRange(startDate: Date, endDate: Date) {
  const date = new Date(startDate.getTime());

  const datesList = [];

  while (date <= endDate) {
    // datesList.push(new Date(date));
    const dateObject = {
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth(),
    };
    datesList.push(dateObject);
    date.setDate(date.getDate() + 1);
  }

  return datesList
    .filter((value, index, self) => index === self.findIndex((t) => t.year === value.year && t.month === value.month))
    .map((item) => new Date(item.year, item.month));
}

const buildDaysCells = (dateRange: Date[]) => {
  return dateRange.map((item, index) => {
    return {
      id: `d${item.getMonth()}${index}`,
      title: item.getDate(),
      start: item,
      end: new Date(item.getFullYear(), item.getMonth(), item.getDate() + 1, 0),
    };
  });
};

// const clickElement = (element: Element) => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);
const clickElement = (element: TrackElement) => {
  setTimelineModalData(element);
};

function createTask(eventList: EventItem[]) {
  return [...new Set(eventList.map((event) => event.type))].map((item, index) => ({
    id: `track-${index + 1}`,
    title: item,
    elements: eventList
      .filter((s) => s.type === item)
      .map((t, ind) => ({
        id: `t-${index + 1}-el-${ind + 1}`,
        title: t.name,
        start: new Date(t.start_date),
        end: new Date(t.end_date),
        style: {
          backgroundColor: t.color,
          borderRadius: "13px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          color: "#000000",
          textTransform: "capitalize",
        },
        image: t.image,
        link: t.link,
      })),
    isOpen: false,
  }));
}

interface Props {
  eventList: EventItem[];
}

export const TimelineContainer = ({ eventList }: Props) => {
  const [open, setOpen] = useState(false);
  const [zoom] = useState(30);
  const [tracks, setTracks] = useState(createTask(eventList));
  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const currentDate = new Date();

  const startDate = subtractMonths(currentDate, 3);
  const endDate = subtractMonths(currentDate, -3);
  const firstDayOfMonth = getFirstDayOfMonth(subtractMonths(currentDate, 3));
  const lastDayOfMonth = getLastDayOfMonth(subtractMonths(currentDate, -3));
  const dateRange = getDatesInRange(firstDayOfMonth, lastDayOfMonth);
  const daysRange = getDaysInRange(firstDayOfMonth, getLastDayOfMonth(endDate));

  const buildTimebar = () => [
    {
      id: "months",
      title: "Months",
      cells: buildMonthsCells(dateRange),
      useAsGrid: false,
      style: {},
    },
    {
      id: "days",
      title: "Days",
      cells: buildDaysCells(daysRange),
      useAsGrid: true,
      style: {},
    },
  ];

  return (
    <TimeLine
      scale={{
        start: startDate,
        end: endDate,
        zoom,
        zoomMin: MIN_ZOOM,
        zoomMax: MAX_ZOOM,
      }}
      isOpen={open}
      toggleOpen={handleToggleOpen}
      clickElement={clickElement}
      timebar={buildTimebar()}
      tracks={tracks}
      now={currentDate}
      enableSticky
      scrollToNow
    />
  );
};
