import React from 'react';

interface Props {
	className?: string;
	name: string;
	section: string;
}

export const Icon = ({ section, name, className }: Props) => {
	return (
		<svg className={className}>
			<use xlinkHref={`/sprites/${section}.svg#${name}`} />
		</svg>
	);
};
