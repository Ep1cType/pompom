import { createEffect, createEvent, createStore, sample } from 'effector';
import { TournamentApi } from 'shared/api/tournament';
import { CreateBody } from 'shared/api/types';
import { CreateTournamentData } from 'shared/api/tournament/types';

interface FormEvent {
	key: string;
	value: string;
}

interface CreateTournamentForm {
	name: string;
	discipline: string;
	start_date: string;
	end_date: string;
}

export const submittedCreateTournamentForm = createEvent();
export const setTournamentFormField = createEvent<FormEvent>();

export const createTournamentFx = createEffect(async (data: CreateTournamentForm) => {
	const Api = new TournamentApi();
	const body: CreateBody<CreateTournamentData> = {
		data: {
			active: true,
			name: data.name,
			discipline: data.discipline,
			start_date: data.start_date,
			end_date: data.end_date
		},
	};

	const response = await Api.postTournament(body);

	return response;
});

export const $createTournamentForm = createStore<CreateTournamentForm>({
	name: "",
	discipline: "",
	end_date: "",
	start_date: ""
})
	.on(setTournamentFormField, (state, { key, value }) => ({
		...state,
		[key]: value,
	}));

sample({
	clock: submittedCreateTournamentForm,
	source: $createTournamentForm,
	target: createTournamentFx,
});