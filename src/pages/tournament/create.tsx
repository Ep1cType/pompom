import React, { useState } from 'react';
import { CreateTournament } from 'features/tournament/create-tournament/ui';
import { createTournamentFx } from 'features/tournament/create-tournament/model';
import Link from 'next/link';

const TournamentCreatePage = () => {
	const [redirectID, setRedirectID] = useState<number | undefined>();

	createTournamentFx.doneData.watch(event => {
		setRedirectID(event.data.data.id)
	})

	return (
		<div className='container mx-auto px-4 pt-16'>
			{redirectID ? (
				<div>
					<h2>Турнир успешно создан</h2>
					<Link href={`/tournament/${redirectID}`}>
						Перейти к созданному турниру
					</Link>
				</div>
			) : (
				<CreateTournament />
			)}
		</div>
	);
};


export default TournamentCreatePage;