import { apiReq } from "shared/api/config";
import { SignInPayload, SignInResponse } from "shared/api/auth/types";

export class AuthApi {
  signIn(payload: SignInPayload) {
    return apiReq
      .post<SignInResponse>("auth/local", {
        identifier: payload.identifier,
        password: payload.password,
      })
      .then((response) => response)
      .catch((response) => Promise.reject(response.response.data));
  }
}

export const TokenAttach = {
  accessToken: async () => {
    if (typeof document === "undefined") return "";
    let token = document.cookie
      .split(";")
      .filter((cookie) => cookie.startsWith("token"))[0];

    if (!token) {
      const response = await fetch("http://localhost:1337/api/token/refresh", {
        method: "POST",
      });
      const data = await response.json();
      if (!data.token) {
        return Promise.reject();
      }
      return Promise.resolve(`Bearer ${data.token}`);
    } else {
      if (typeof token === "undefined") return "expired";
      const [_, accessToken] = token.split("=");
      return Promise.resolve(`Bearer ${accessToken}`);
    }
  },
};
