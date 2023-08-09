import { createEffect, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";
import { TrackElement } from "organisms/timeline-modal/type";

export const setTimelineModalOpen = createEvent();
export const setTimelineModalClose = createEvent();

export const setTimelineModalData = createEffect(
  async (element: TrackElement) => {
    return element;
  },
);

export const $isTimelineModalOpen = createStore(false);
export const $timelineModalData = createStore<TrackElement>({
  title: "",
  image: null,
  end: new Date(),
  start: new Date(),
  link: "",
});

$isTimelineModalOpen.on(setTimelineModalOpen, () => true);

sample({
  clock: setTimelineModalData,
  target: [$timelineModalData, setTimelineModalOpen],
});

reset({
  clock: setTimelineModalClose,
  target: $isTimelineModalOpen,
});
