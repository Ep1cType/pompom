import React, { useEffect } from 'react';
import { CharacterApi } from 'shared/api/character';

const Api = new CharacterApi();

export default function HomePage() {
	useEffect(() => {
		Api.getCharacter({ name: "Astra", locale: "ru" });
	}, [])

	return (
		<div className="container mx-auto px-4">
			<h1>Welcome</h1>
		</div>
	);
}
