import { ImageDataResponse, ResponseDataItem } from 'shared/api/types';

export interface Guide {
	title: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	body: GuideBody[];
	slug: string;
	cover: {
		data: ResponseDataItem<ImageDataResponse>
	};
}

export interface GuideBody {
	id: number;
	title: string | null;
	text: string | null;
	__component: GuideComponentList;
	images: {
		data: ResponseDataItem<ImageDataResponse>[] | null
	};
}

export type GuideComponentList = 'guide.section'