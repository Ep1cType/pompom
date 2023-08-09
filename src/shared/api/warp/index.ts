import { apiReq } from "shared/api/config";
import axios from "axios";
import { WarpItem } from "shared/api/warp/types";

export class WarpApi {
  getWarpList(link: string) {
    return axios.post<WarpItem[]>("https://dev.pom-pom.pro/", {
      link,
    });
  }
}
