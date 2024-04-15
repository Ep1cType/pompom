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
      <div className="container mx-auto px-4 py-8 ">
        <PageTitle className="mb-8 md:mb-16" text="Лента событий" />
        <TimelineContainer eventList={eventList} />
        <TimelineModal />
      </div>
    </>
  );
}
