import { apiReq } from "shared/api/config";
import { ApiCollectionResponse } from "shared/api/types";
import { EventItem } from "shared/api/event/type";

export class EventApi {
  getEventsList() {
    return apiReq.get<ApiCollectionResponse<EventItem>>("events", {
      params: {
        populate: "*",
      },
    });
  }
}
