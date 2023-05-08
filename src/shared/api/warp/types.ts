export interface GachaResponse {
	data: null | {};
	message: string;
	retcode: string;
}

export interface WarpItem {
	count: string;
	gacha_id: string;
	gacha_type: string;
	id: string;
	item_id: string;
	item_type: string;
	lang: string;
	name: string;
	rank_type: string;
	time: string;
	uid: string
}

export type GachaTypeList = '1' | '2' | '11' | '12';
//1 - Эвентовый персонаж
//2 - баннер новичка
//11 - Стандартный баннер
//12 - Эвентовый конус