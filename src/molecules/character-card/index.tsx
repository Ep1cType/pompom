import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ImageDataResponse } from 'shared/api/types';
import { CharacterElementList } from 'shared/api/character/type';
import Link from 'next/link';

type Props = {
	name: string;
	img: ImageDataResponse;
	starCount: 'four' | 'five';
	element: CharacterElementList;
	className?: string;
}

export const CharacterCard = ({ img, name, starCount, element, className }: Props) => {
	return (
		<Link href={`/characters/${name}`} className={clsx('card relative group', className)}>
			<div
				className={
					clsx(
						'aspect-square overflow-hidden',
						starCount === 'four' && 'bg-gradient-to-b from-[#3F4064] to-[#9C65D7]',
						starCount === 'five' && 'bg-gradient-to-b from-[#A35D55] to-[#D0AA6E]')
				}
			>
				<Image
					className='w-full h-auto object-contain object-bottom group-hover:scale-105 transition-all duration-100 ease-linear'
					src={`${process.env.NEXT_PUBLIC_API_URL}${img.url}`}
					width={img.width}
					height={img.height}
					alt={img.name}
				/>
			</div>
			<div
				className='aspect-square w-6 h-6 absolute right-0 top-0 flex justify-center items-center bg-black rounded-full translate-x-1/2 -translate-y-1/2'>
				<img
					className='w-5 h-5'
					src={`/icons/elements/${element}.webp`}
					width={256}
					height={256}
					alt={`${element} icon`}
				/>
			</div>

			<h2 className='text-center mt-1 text-xs/none sm:text-sm md:text-base/tight'>{name}</h2>
		</Link>
	);
};

function getElementImageUrl(element: CharacterElementList) {
	switch (element) {
		case 'ice':
			return '';
	}
}