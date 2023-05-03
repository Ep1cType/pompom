import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

type Props = {
	className?: string;
}

export const Footer = ({ className }: Props) => {
	const { locale } = useRouter();

	const title = locale === 'ru' ? 'pom-pom.pro не является аффилированным и не связан с HoYoverse.' : 'pom-pom.pro is not affiliated with HoYoverse.';
	const desc = locale === 'ru' ? 'Honkai: Star Rail, контент и материалы игры являются товарными знаками и принадлежат HoYoverse.' : 'Honkai: Star Rail, game content and materials are trademarks and copyrights of HoYoverse.';

	return (
		<footer className={clsx('flex-shrink-0 bg-blue-900 py-4', className)}>
			<div className='container mx-auto px-4'>
				<p className='mb-2 text-xs'>{title}</p>
				<p className='text-xs'>{desc}</p>
			</div>
		</footer>
	);
};
