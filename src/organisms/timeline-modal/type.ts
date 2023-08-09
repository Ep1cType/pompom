import { ImageDataResponse } from 'shared/api/types';

export interface TrackElement {
	start: Date;
	end: Date;
	title: string;
	image: ImageDataResponse | null;
	link: string;
}
