import React, { ChangeEvent, HTMLInputTypeAttribute, SyntheticEvent } from 'react';
import {
	$createTournamentForm, createTournamentFx,
	setTournamentFormField,
	submittedCreateTournamentForm,
} from 'features/tournament/create-tournament/model';
import { useStore, useStoreMap } from 'effector-react';

export const CreateTournament = () => {
	const isSending = useStore(createTournamentFx.pending);

	function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();
		submittedCreateTournamentForm();
	}

	return (
		<form onSubmit={handleSubmit} className='border border-amber-300 p-2 flex flex-col gap-5'>
			<Input disable={isSending} name='name' label={'Название турнира'} type={'text'} />

			<Input disable={isSending} name='discipline' label={'Дисциплина'} type={'text'} />

			<Input disable={isSending} name='start_date' label={'Дата начала'} type={'date'} />

			<Input disable={isSending} name='end_date' label={'Дата окончания'} type={'date'} />

			<button disabled={isSending} type='submit' className='btn'>
				Создать
			</button>
		</form>
	);
};

type InputProps = {
	label: string;
	type: HTMLInputTypeAttribute;
	name: 'name' | 'discipline' | 'end_date' | 'start_date';
	disable?: boolean;
}

const Input = ({ label, type, name, disable }: InputProps) => {
	const value = useStoreMap({
		store: $createTournamentForm,
		keys: [name],
		fn: values => values[name] || '',
	});

	const handleChange = setTournamentFormField.prepend((e: ChangeEvent<HTMLInputElement>) => ({
		key: e.target.name,
		value: e.target.value,
	}));

	return (
		<label className='flex items-center gap-2'>
			<span>{label}</span>
			<input name={name} type={type} value={value} disabled={disable} onChange={handleChange} className='input input-bordered input-sm' />
		</label>
	);
};

