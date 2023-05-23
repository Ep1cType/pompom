import React, { useEffect } from 'react';
import { loadGuideListFx } from 'shared/api/guide/request';
import { PageTitle } from 'shared/ui/page-title';
import { NavigationCard } from 'molecules/navigation-card/navigation-card';


export default function HomePage() {
	useEffect(() => {
		loadGuideListFx()
	}, [])

	return (
		<div className="container mx-auto px-4 py-8">
			<PageTitle className="mb-8 md:mb-16" text={"Главная"} />
			<section className="space-y-2 md:space-y-4">
				<NavigationCard link={"/characters"} title={"Персонажи"}>
					<p>
						Здесь вы можете посмотреть игровых персонажей !
					</p>
				</NavigationCard>
				<NavigationCard link={"/warp"} title={"История прыжков"}>
					<p>
						Здесь вы можете загрузить свою историю прыжков из игры и посмотреть её в удобном формате !
					</p>
				</NavigationCard>
				<NavigationCard link={"/timeline"} title={"Лента событий"}>
					<p>
						Здесь вы можете посмотреть ленту игровых событий !
					</p>
				</NavigationCard>
			</section>
		</div>
	);
}
