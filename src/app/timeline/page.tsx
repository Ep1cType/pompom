import type { Metadata } from "next";

import { TimelineContainer } from "organisms/timeline-container";
import { TimelineModal } from "organisms/timeline-modal/timeline-modal";

import { getEventsList } from "shared/api/event";
import { PageTitle } from "shared/ui/page-title";

export const metadata: Metadata = {
  title: "Лента событий",
  description: "Здесь вы можете посмотреть ленту игровых событий.",
  alternates: {
    canonical: "/timeline",
  },
  openGraph: {
    title: "Лента событий",
    description: "Здесь вы можете посмотреть ленту игровых событий.",
  },
};

async function getData() {
  return await getEventsList();
}

export default async function TimelinePage() {
  const eventList = await getData();
  return (
    <>
      <div className="container mx-auto py-8 md:px-4 ">
        <PageTitle className="mb-8 px-4 md:mb-16 md:px-0" text="Лента событий" />
        <TimelineContainer eventList={eventList} />
        <TimelineModal />
      </div>
    </>
  );
}
