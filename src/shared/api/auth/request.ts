import { createEffect } from "effector";
import {
  SignInError,
  SignInPayload,
  SignInResponse,
} from "shared/api/auth/types";
import { AuthApi } from "shared/api/auth/index";

const Api = new AuthApi();

export const loginByEmailFx = createEffect<
  SignInPayload,
  SignInResponse,
  SignInError
>(async (form) => {
  const response = await Api.signIn(form);

  return response.data;
});
