import React, { useEffect } from 'react';
import { loadGuideListFx } from 'shared/api/guide/request';


export default function HomePage() {
	useEffect(() => {
		loadGuideListFx()
	}, [])

	return (
		<div className="container mx-auto px-4">
			<h1>Welcome</h1>
		</div>
	);
}
