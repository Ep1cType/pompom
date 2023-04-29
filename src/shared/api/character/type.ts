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

export type CharacterSexList = "male" | "female";

export interface CharacterExtend extends Character {
	info: {
		id: number;
		sex: CharacterSexList;
		main_skill: CharacterMainSkill[];
		image: {
			data: ResponseDataItem<ImageDataResponse>
		};
		story: string;
	}
}

export interface CharacterMainSkill {
	description: {};
	icon: CreateBody<ResponseDataItem<ImageDataResponse>>;
	id: number;
	name: string;
	text_color: string;
	type: string;
}