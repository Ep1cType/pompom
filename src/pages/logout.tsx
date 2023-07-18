import { GetServerSideProps } from 'next';

const LogoutPage = () => {
	return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	context.res.setHeader('Set-Cookie', [
		`token=deleted; Max-Age=0; Path=/`,
		`refresh_token=deleted; Max-Age=0; Path=/`,
	]);
	return {
		redirect: { permanent: false, destination: '/' },
		props: { initialState: {} },
	};
};

export default LogoutPage;
