import React, { useEffect } from 'react';
import { loadGuideListFx } from 'shared/api/guide/request';
import { PageTitle } from 'shared/ui/page-title';
import { NavigationCard } from 'molecules/navigation-card/navigation-card';
import Head from 'next/head';


export default function HomePage() {
	useEffect(() => {
		loadGuideListFx()
	}, [])

	return (
		<>
			<Head>
				<title>{`Главная | pom-pom.pro`}</title>
				<meta property='og:title' content={`Главная | pom-pom.pro`} />
				<meta property='og:description'
							content={'На сайте вы можете посмотреть историю прыжков из игры, информацию о игровых персонажах. Также имеется календарь событий.'} />
				<meta name='description'
							content={'На сайте вы можете посмотреть историю прыжков из игры, информацию о игровых персонажах. Также имеется календарь событий.'} />
				<meta property='og:url' content={`${process.env.NEXT_PUBLIC_DOMAIN}/`} />
				<meta property='og:type' content='website' />
				<meta property='og:locale' content={'ru'} />
			</Head>
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
		</>
	);
}
