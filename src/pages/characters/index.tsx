import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { $charactersList, fetchCharactersListFx } from 'entities/character/model';
import { useRouter } from 'next/router';
import { CharacterCard } from 'molecules/character-card';

const CharactersPage = () => {
	const charactersList = useStore($charactersList);
	
	const router = useRouter();

	useEffect(() => {
		fetchCharactersListFx({locale: router.locale})
	}, [router.locale])

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
				{charactersList.map((character, index) => (
					<CharacterCard
						key={character.id}
						name={character.attributes.name}
						img={character.attributes.icon.data.attributes}
						starCount={character.attributes.star}
						element={character.attributes.element}
					/>
				))}
			</div>
		</div>
	);
};

export default CharactersPage;