import React, { ReactNode } from 'react';
import { Header } from 'shared/ui/header';
import { AuthModal } from 'widgets/auth-modal/ui';

type Props = {
	children: ReactNode;
}
export const Layout = ({children}: Props) => {
	return (
		<>
			<Header />
			<main>
				{children}
			</main>
			<footer>

			</footer>
			<AuthModal />
		</>
	);
};
