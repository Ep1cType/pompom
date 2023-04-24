import { CreateBody, ImageDataResponse, ResponseDataItem } from 'shared/api/types';

export interface Character {
	name: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	icon: CreateBody<ResponseDataItem<ImageDataResponse>>;
	star: "four" | "five";
	element: CharacterElementList;
}

export type CharacterElementList = "fire" | "ice" | "lightning" | "wind" | "physical" | "quantum";