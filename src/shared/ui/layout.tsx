import React, { ReactNode } from 'react';
import { Header } from 'shared/ui/header';
import { AuthModal } from 'widgets/auth-modal/ui';
import clsx from 'clsx';
import { Footer } from 'shared/ui/footer';

type Props = {
	children: ReactNode;
	className?: string;
};
export const Layout = ({ children, className }: Props) => {
	return (
		<div className="flex flex-col min-h-screen h-full text-white w-full">
			<Header className={className} />
			<main className={clsx('flex-grow bg-blue-950', className)}>
				{children}
			</main>
			<Footer className={className} />
			{/*<AuthModal />*/}
		</div>
	);
};

export const variants = {
	hidden: { opacity: 0, x: -200, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -100 },
};
