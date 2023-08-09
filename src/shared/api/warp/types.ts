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
	uid: string;
}

//1 - Стандартный баннер
//2 - баннер новичка
//11 - Эвентовый персонаж
//12 - Эвентовый конус
export interface GachaType {
	'1': 'Стандартный прыжок';
	'2': 'Отправной прыжок';
	'11': 'Прыжок события: Персонаж';
	'12': 'Прыжок события: Световой конус';
}
