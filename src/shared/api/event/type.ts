import { ImageDataResponse, ResponseDataItem } from 'shared/api/types';

export interface EventItem {
	name: string;
	start_date: string;
	end_date: string;
	color: string;
	link: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	type: EventTypeList;
	image: {
		data: ResponseDataItem<ImageDataResponse> | null
	}
}

export type EventTypeList = "char_banner" | "cone_banner" | "battle_pass" | "shop" | "oblivion"