import { apiReq } from 'shared/api/config';
import { ApiCollectionResponse } from 'shared/api/types';
import { Guide } from 'shared/api/guide/type';

export class GuideApi {
	getGuideList() {
		return apiReq.get<ApiCollectionResponse<Guide>>("guides", {
			params: {
				"populate[0]": "cover,slug",
				// "populate[0]": "body,cover",
				// "populate[1]": "body.images",
				locale: "ru"
			}
		})
	}

	getGuidePage({slug}: GetGuidePageParams) {
		return apiReq.get<ApiCollectionResponse<Guide>>("guides", {
			params: {
				"filters[slug][$eq]": slug,
				"populate[0]": "body",
				"populate[1]": "body.images",
				locale: "ru"
			}
		})
	}
}

interface GetGuidePageParams {
	slug: string
}