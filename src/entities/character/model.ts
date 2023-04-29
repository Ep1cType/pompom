import { createEffect, createStore } from 'effector';
import { CharacterApi } from 'shared/api/character';
import { LocaleParams, ResponseDataItem } from 'shared/api/types';
import { Character } from 'shared/api/character/type';

const Api = new CharacterApi;

export const fetchCharactersListFx = createEffect(async ({locale}: LocaleParams) => {
	return await Api.getCharactersList({locale});
});

export const $charactersList = createStore<ResponseDataItem<Character>[]>([])
	.on(fetchCharactersListFx.doneData, (_, payload) => payload.data.data);