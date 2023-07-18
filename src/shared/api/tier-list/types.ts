import { Character } from 'shared/api/character/type';
import { ResponseDataItem } from 'shared/api/types';

export interface TierList {
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	s: {
		data: ResponseDataItem<Character>[];
	};
	a: {
		data: ResponseDataItem<Character>[];
	};
	b: {
		data: ResponseDataItem<Character>[];
	};
	c: {
		data: ResponseDataItem<Character>[];
	};
	d: {
		data: ResponseDataItem<Character>[];
	};
}
