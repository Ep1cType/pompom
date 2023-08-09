import { createEffect } from "effector";
import { EventApi } from "shared/api/event/index";

const Api = new EventApi();

export const loadEventListFx = createEffect(async () => {
  try {
    const response = await Api.getEventsList();

    return response.data.data;
  } catch (e) {}
});
