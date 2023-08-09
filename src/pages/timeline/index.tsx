import React, { useState } from "react";
import dynamic from "next/dynamic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseDataItem } from "shared/api/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { EventApi } from "shared/api/event";
import { EventItem } from "shared/api/event/type";
import { TimelineModal } from "organisms/timeline-modal/timeline-modal";
import { setTimelineModalData } from "organisms/timeline-modal/model";
import { TrackElement } from "organisms/timeline-modal/type";
import { PageTitle } from "shared/ui/page-title";
import Head from "next/head";
import { useRouter } from "next/router";

const TimeLine = dynamic(
  () => import("shared/lib/react-timelines").then((res) => res.TimeLine),
  {
    ssr: false,
  },
);

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

const MIN_ZOOM = 2;
const MAX_ZOOM = 50;

function getMonthDate(year: number, month: number) {
  return new Date(year, month);
}

const now = new Date();

// const clickElement = (element: Element) => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);
const clickElement = (element: TrackElement) => {
  setTimelineModalData(element);
};

function createTask(eventList: ResponseDataItem<EventItem>[]) {
  return [...new Set(eventList.map((event) => event.attributes.type))].map(
    (item, index) => ({
      id: `track-${index + 1}`,
      title: item,
      elements: eventList
        .filter((s) => s.attributes.type === item)
        .map((t, ind) => ({
          id: `t-${index + 1}-el-${ind + 1}`,
          title: t.attributes.name,
          start: new Date(t.attributes.start_date),
          end: new Date(t.attributes.end_date),
          style: {
            backgroundColor: t.attributes.color,
            borderRadius: "13px",
            boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
            color: "#000000",
            textTransform: "capitalize",
          },
          image: t.attributes.image.data?.attributes,
          link: t.attributes.link,
        })),
      isOpen: false,
    }),
  );
}

const LinePage = ({
  eventList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [open, setOpen] = useState(false);
  const [zoom] = useState(30);
  const [tracks, setTracks] = useState(createTask(eventList));
  const router = useRouter();
  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const currentDate = new Date();

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
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.year === value.year && t.month === value.month,
          ),
      )
      .map((item) => new Date(item.year, item.month));
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

  const startDate = subtractMonths(currentDate, 3);
  const endDate = subtractMonths(currentDate, -3);
  const firstDayOfMonth = getFirstDayOfMonth(subtractMonths(currentDate, 3));
  const lastDayOfMonth = getLastDayOfMonth(subtractMonths(currentDate, -3));
  const dateRange = getDatesInRange(firstDayOfMonth, lastDayOfMonth);
  const daysRange = getDaysInRange(firstDayOfMonth, getLastDayOfMonth(endDate));

  const buildDaysCells = (dateRange: Date[]) => {
    return dateRange.map((item, index) => {
      return {
        id: `d${item.getMonth()}${index}`,
        title: item.getDate(),
        start: item,
        end: new Date(
          item.getFullYear(),
          item.getMonth(),
          item.getDate() + 1,
          0,
        ),
      };
    });
  };

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
    <>
      <Head>
        <title>Лента событий | pom-pom.pro</title>
        <meta property="og:title" content={`Лента событий | pom-pom.pro`} />
        <meta
          property="og:description"
          content={"Здесь вы можете посмотреть ленту игровых событий."}
        />
        <meta
          name="description"
          content={"Здесь вы можете посмотреть ленту игровых событий."}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/timeline`}
        />
        <meta property="og:type" content="list" />
        <meta property="og:locale" content={router.locale} />
      </Head>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <PageTitle className="mb-8 md:mb-16" text={"Лента событий"} />
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
          now={now}
          enableSticky
          scrollToNow
        />
        <TimelineModal />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  eventList: ResponseDataItem<EventItem>[];
}> = async (context) => {
  const Api = new EventApi();

  const locale = context.locale as string;

  try {
    const response = await Api.getEventsList();

    return {
      props: {
        eventList: response.data.data,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        eventList: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
};

export default LinePage;
