import { apiReq } from "shared/api/config";
import {
  ApiCollectionResponse,
  ApiSingleResponse,
  CreateBody,
} from "shared/api/types";
import {
  CreateTournamentData,
  Tournament,
  TournamentExtend,
} from "shared/api/tournament/types";

export class TournamentApi {
  getTournamentList() {
    return apiReq.get<ApiCollectionResponse<Tournament>>("tournament");
  }
  getTournament(id: number) {
    return apiReq.get<ApiSingleResponse<TournamentExtend>>(
      `tournament/${id}?populate=*`,
    );
  }
  postTournament(body: CreateBody<CreateTournamentData>) {
    return apiReq.post<ApiSingleResponse<Tournament>>("tournament", body);
  }
}
