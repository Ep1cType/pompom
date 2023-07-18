import { ResponseDataItem } from 'shared/api/types';
import { Player } from 'shared/api/player/types';

export interface Tournament {
	active: boolean;
	createdAt: string;
	discipline: string;
	end_date: string;
	name: string;
	publishedAt: string;
	start_date: string;
	updatedAt: string;
}

export interface TournamentExtend extends Tournament {
	players: {
		data: ResponseDataItem<Player>[];
	};
}

export interface CreateTournamentData {
	name: string;
	discipline: string;
	start_date: string;
	end_date: string;
	active: boolean;
	players?: string[] | number[];
	matches?: string[] | number[];
}
