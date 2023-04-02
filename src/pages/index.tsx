import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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

	return (
		<>
			<h1 className='text-red-600'>
				{process.env.NEXT_PUBLIC_API_URL}
			</h1>
			<div className='flex flex-col space-y-5'>
				<label>
					<input value={login} onChange={e => setLogin(e.target.value)} type='text' placeholder='login' />
				</label>
				<label>
					<input value={pass} onChange={e => setPass(e.target.value)} type='text' placeholder='password' />
				</label>
				<button className="btn" onClick={sub}>Login</button>
			</div>
		</>
	);
}
