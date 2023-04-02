import React from 'react';
import dynamic from "next/dynamic";
import Link from 'next/link';
import { useStore } from 'effector-react';
import { $tournamentsList, TournamentsListGate } from 'entities/tournament/model';

const DynamicTour = dynamic(() => import('shared/ui/tour'), {
	ssr: false
})

export default function TournamentsPage() {
	const tournamentsList = useStore($tournamentsList);
	return (
		<div className="container mx-auto px-4 pt-16">
			<Link href={"tournament/create"} className="btn btn-outline" >
				Создать турнир
			</Link>
			<TournamentsListGate />
			<ul>
				{tournamentsList.map((el, index) => (
					<li key={el.id}>
						<Link href={`/tournament/${el.id}`}>
							{index + 1} {el.attributes.name}
						</Link>
					</li>
				))}
			</ul>
			<DynamicTour />
		</div>
	);
};
