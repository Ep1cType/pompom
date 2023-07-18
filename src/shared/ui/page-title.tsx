import React, { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
	text: ReactNode;
	className?: string;
};

export const PageTitle = ({ text, className }: Props) => {
	return (
		<h1 className={clsx('text-4xl md:text-5xl font-semibold', className)}>
			{text}
		</h1>
	);
};
