import { createEffect } from 'effector';
import { TierList } from 'shared/api/tier-list/types';
import { SignInError } from 'shared/api/auth/types';
import { TierListApi } from 'shared/api/tier-list';

const Api = new TierListApi();

export const getTierListFx = createEffect<null, TierList, SignInError>(async () => {
	const response = await Api.getTierList();
	return response.data.data.attributes;
});