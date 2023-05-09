import React, { useEffect } from 'react';
import { loadGuideListFx } from 'shared/api/guide/request';
import { PageTitle } from 'shared/ui/page-title';


export default function HomePage() {
	useEffect(() => {
		loadGuideListFx()
	}, [])

	return (
		<div className="container mx-auto px-4 py-8">
			<PageTitle text={"Страница на доработке"} />
		</div>
	);
}
