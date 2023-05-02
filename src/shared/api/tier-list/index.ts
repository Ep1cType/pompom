import { apiReq } from 'shared/api/config';
import { ApiSingleResponse } from 'shared/api/types';
import { TierList } from 'shared/api/tier-list/types';

export class TierListApi {
	getTierList() {
		return apiReq.get<ApiSingleResponse<TierList>>('tier-list?populate[s][populate][0]=icon&populate[a][populate][0]=icon&populate[b][populate][0]=icon&populate[c][populate][0]=icon&populate[d][populate][0]=icon')
			.then((response) => response)
			.catch(response => Promise.reject(response.response.data))
	}
}