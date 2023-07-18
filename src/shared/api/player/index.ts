import { apiReq } from 'shared/api/config';
import { ApiCollectionResponse, ApiSingleResponse } from 'shared/api/types';
import { Player } from 'shared/api/player/types';

export const getPlayersListController = new AbortController();

export class PlayerApi {
	getPlayersList() {
		return apiReq.get<ApiCollectionResponse<Player>>('players');
	}
	getPlayer(id: number) {
		return apiReq.get<ApiSingleResponse<Player>>(`players/${id}`);
	}
}
