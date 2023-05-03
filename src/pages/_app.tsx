import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'shared/ui/layout';
import { Open_Sans } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';

const sans = Open_Sans({
	subsets: ['latin', 'cyrillic', 'greek'],
	variable: '--font-sans',
	weight: 'variable',
});

function App({ Component, pageProps }: AppProps) {
	return (
		<Layout className={`${sans.variable} font-sans`}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default appWithTranslation(App)
