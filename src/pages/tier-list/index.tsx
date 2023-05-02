import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { TierList } from 'shared/api/tier-list/types';
import { TierListApi } from 'shared/api/tier-list';
import { CharacterCard } from 'molecules/character-card';

const TierListPage = ({ tierList }: InferGetStaticPropsType<typeof getStaticProps>) => {

	if (!tierList) {
		return (
			<h2>Ошибка сервера</h2>
		);
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<section className='flex flex-col gap-1 w-full'>
				{tierListLetters.map((letter) => (
					<div key={letter} className='flex w-full'>
						<div style={{backgroundColor: tierListColors[letter]}} className='w-24 rounded-l text-blue-950 flex justify-center items-center font-medium text-3xl/none'>
							{letter}
						</div>
						<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-12 gap-5 bg-blue-900 py-4 px-2 w-full'>
							{tierList[letter].data.map((tier) => (
								<CharacterCard
									key={tier.id}
									className="w-16"
									name={tier.attributes.name}
									img={tier.attributes.icon.data.attributes}
									starCount={tier.attributes.star}
									element={tier.attributes.element}
								/>
								))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
};

const tierListLetters: TierLetters[] = ['s', 'a', 'b', 'c', 'd'];
type TierLetters = keyof Pick<TierList, "s" | "a" | "b" | "c" | "d">

interface TierColors {
	[K: string]: string
}

const tierListColors: TierColors = {
	s: "#E57373",
	a: "#FFB74D",
	b: "#FFF176",
	c: "#AED581",
	d: "#81C784"
}

export const getStaticProps: GetStaticProps<{ tierList: TierList | null }> = async (
	context,
) => {
	const Api = new TierListApi();

	try {
		const response = await Api.getTierList();

		return {
			props: {
				tierList: response.data.data.attributes,
			},
			revalidate: 120,
		};
	} catch (e) {
		return {
			props: {
				tierList: null,
			},
			notFound: true,
			revalidate: 120,
		};
	}


};

export default TierListPage;