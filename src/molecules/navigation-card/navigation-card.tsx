import React, { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
	title: string;
	children: ReactNode;
	link: string;
}

export const NavigationCard = ({ title, children, link }: Props) => {
	return (
		<div className='bg-blue-900 shadow-info shadow-blue-900 rounded-2xl hover:opacity-70'>
			<Link className='p-6 md:p-8 block' href={link}>
				<h2 className='text-2xl mb-2 md:mb-4'>
					{title}
				</h2>
				{children}
				<span className="underline block mt-2">Перейти</span>
			</Link>
		</div>
	);
};
