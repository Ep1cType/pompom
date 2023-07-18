import { NextApiRequest, NextApiResponse } from 'next';
import { AuthApi } from 'shared/api/auth';
import { parseJwt } from 'shared/api/auth/config';

const handlerLogin = async (req: NextApiRequest, res: NextApiResponse) => {
	const nowUnix = (+new Date() / 1e3) | 0;
	const UserApi = new AuthApi();

	try {
		// const body = JSON.parse(req.body);
		// console.log("BODY", body)
		const { data, status } = await UserApi.signIn({
			...req.body,
		});

		// const { access_token, refresh_token } =
		// 	await CustomerApi.customerSignInRequestWrapper({
		// 		body: JSON.parse(req.body),
		// 	});
		const access_token_decoded: { exp: number } | null = parseJwt(data.jwt);
		// const refresh_token_decoded: { exp: number } = parseJwt(refresh_token);
		if (!access_token_decoded) throw new Error('');

		res.setHeader('Set-Cookie', [
			`token=${data.jwt}; Max-Age=${
				access_token_decoded.exp - nowUnix
			}; Path=/`,
			// `refresh_token=${refresh_token}; Max-Age=${
			// 	refresh_token_decoded.exp - nowUnix
			// }; Path=/; HttpOnly=true`,
		]);

		res.send({ kek: data.jwt });
	} catch (e) {
		res.status(401);
		res.send({ message: 'error_while_login' });
	}
};

export default handlerLogin;
