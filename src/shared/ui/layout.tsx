import React, { ReactNode } from 'react';
import { Header } from 'shared/ui/header';
import { AuthModal } from 'widgets/auth-modal/ui';

type Props = {
	children: ReactNode;
}
export const Layout = ({children}: Props) => {
	return (
		<div className="flex flex-col min-h-screen h-full text-white w-screen">
			<Header />
			<main className="flex-grow bg-blue-950">
				{children}
			</main>
			<footer className="flex-shrink-0 ">
				hello
			</footer>
			<AuthModal />
		</div>
	);
};
