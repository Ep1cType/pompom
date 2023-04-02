import React from 'react';
import { GetServerSideProps } from 'next';
import { $tournamentInfo, fetchTournamentInfo, TournamentGate } from '../../entities/tournament/model';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { PlayerRow } from '../../entities/player/ui';
import clsx from 'clsx';

export default function TournamentPage() {
	const { query } = useRouter();
	const tournamentID = Number(query.id)

	const tournamentInfo = useStore($tournamentInfo);
	const isLoading = useStore(fetchTournamentInfo.pending);

	return (
		<div className='container mx-auto px-4 pt-16'>
			<TournamentGate id={tournamentID} />
			{!isLoading && Object.keys(tournamentInfo).length > 0 && (
				<>
					<div className={clsx("alert text-white mb-5", tournamentInfo.attributes.active ? "alert-success" : "alert-error")}>
						{tournamentInfo.attributes.active ? (
							<p>Турнир активен</p>
						) : (
							<p>Турнир закончен</p>
						)}
					</div>
					<section className="flex justify-between gap-10">
						<div className="w-1/2">
							<div className="prose">
								<h1>{tournamentInfo.attributes.name}</h1>
								<p>
									Начало: {tournamentInfo.attributes.start_date}
								</p>
								<p>
									Конец: {tournamentInfo.attributes.end_date}
								</p>
							</div>
						</div>
						<div className="w-1/2">
							<h2 className="text-2xl mb-5">Участники:</h2>
							<table className="border-collapse border border-amber-300 text-sm">
								{tournamentInfo.attributes.players.data.map((el) => (
									<PlayerRow key={el.id} player={el} />
								))}
							</table>
						</div>
					</section>
				</>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {},
	};
};
