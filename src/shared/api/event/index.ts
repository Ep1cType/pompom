import { apiReq } from "shared/api/config";
import { EventItem } from "shared/api/event/type";
import fetchApi from "shared/api/strapi";
import { ApiCollectionResponse } from "shared/api/types";

export const getEventsList = () => {
  return fetchApi<EventItem[]>({
    endpoint: "events",
    query: {
      populate: "*",
      "pagination[pageSize]": "100",
      "sort[0]": "type",
    },
    wrappedByKey: "data",
  });
};

export class EventApi {}
