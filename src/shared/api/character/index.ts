import { apiReq } from 'shared/api/config';
import { ApiCollectionResponse } from 'shared/api/types';
import { Character } from 'shared/api/character/type';

export class CharacterApi {
	getCharactersList({locale = "en"}: Params) {
		return apiReq.get<ApiCollectionResponse<Character>>("characters", {
			params: {
				populate: "icon",
				locale
			}
		})
	}
}

interface Params {
	locale?: string;
}