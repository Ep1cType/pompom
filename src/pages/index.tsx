import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStore } from 'effector-react';
import { $charactersList, fetchCharactersListFx } from 'entities/character/model';
import { CharacterCard } from 'molecules/character-card';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
	const [login, setLogin] = useState("test");
	const [pass, setPass] = useState("Test123")
	const router = useRouter();


	function sub() {
		axios.post("/api/login", {
			identifier: login,
			password: pass
		})
			.then(() => {
				router.push("/players")
			})
	}

	const charactersList = useStore($charactersList)

	useEffect(() => {
		fetchCharactersListFx({locale: router.locale})
	}, [])


	return (
		<div className="container mx-auto px-4">
			<h1 className='text-red-600'>
				{process.env.NEXT_PUBLIC_API_URL}
				DRONE CHANGE WELCOME
			</h1>
			<h2>CHECK AUTO DEPLOY</h2>
			<div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
				{charactersList.map((character) => (
					<CharacterCard
						key={character.id}
						name={character.attributes.name}
						img={character.attributes.icon.data.attributes}
						starCount={character.attributes.star}
						element={character.attributes.element}
					/>
				))}
			</div>
			<div className='flex flex-col space-y-5'>
				<label>
					<input value={login} onChange={e => setLogin(e.target.value)} type='text' placeholder='login' />
				</label>
				<label>
					<input value={pass} onChange={e => setPass(e.target.value)} type='text' placeholder='password' />
				</label>
				<button className="btn" onClick={sub}>Login</button>
			</div>
		</div>
	);
}
