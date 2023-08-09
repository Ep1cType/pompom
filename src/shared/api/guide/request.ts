import { createEffect } from "effector";
import { GuideApi } from "shared/api/guide/index";

const Api = new GuideApi();

export const loadGuideListFx = createEffect(async () => {
  try {
    const response = await Api.getGuideList();
    return response.data.data;
  } catch (e) {
    return Promise.reject("Ошибка выполнения запроса");
  }
});
