import { createEffect, createStore, sample } from 'effector';
import { getPlayersListController, PlayerApi } from 'shared/api/player';
import { PaginationDataResponse, ResponseDataItem } from 'shared/api/types';
import { Player } from 'shared/api/player/types';
import { paginationInitialData } from 'shared/api/model';
import { createGate } from 'effector-react';

const Api = new PlayerApi();

export const fetchPlayersListFx = createEffect(async () => {
	return await Api.getPlayersList();
});

export const $playerListPagination = createStore<PaginationDataResponse>(paginationInitialData)
	.on(fetchPlayersListFx.doneData, (_, payload) => payload.data.meta.pagination);
export const $playersList = createStore<ResponseDataItem<Player>[]>([])
	.on(fetchPlayersListFx.doneData, (_, payload) => payload.data.data)

export const PlayersListGate = createGate();

sample({
	clock: PlayersListGate.open,
	target: fetchPlayersListFx,
});
