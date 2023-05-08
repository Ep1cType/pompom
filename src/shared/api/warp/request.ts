import { createEffect } from 'effector';
import { GachaType, WarpItem } from 'shared/api/warp/types';
import { WarpApi } from 'shared/api/warp/index';

export const gachaTypeList: Array<keyof GachaType> = ['1', '2', '11', '12'];

const Api = new WarpApi();

export const loadWarpListFx = createEffect<string, any, any>(async (link) => {
	try {
		const url = new URL(link);
		const data: { [key in keyof GachaType]: WarpItem[] } = {
			'1': [],
			'2': [],
			'11': [],
			'12': [],
		};
		url.searchParams.delete('gacha_type');
		for (const gachaType of gachaTypeList) {
			url.searchParams.set('gacha_type', gachaType);
			const response = await Api.getWarpList(url.toString());
			data[gachaType] = response.data;
		}
		return data;
	} catch (e) {
		return Promise.reject("Check link")
	}

});

// export const loadWarpListFxDepr = createEffect<string, any, any>(async (link) => {
// 	let pageNumber = 1;
// 	// let list = [];
// 	let responseData = [];
// 	let uid = '';
// 	let region = '';
// 	let region_time_zone = '';
// 	let lastID = '0';
//
// 	do {
// 		if (pageNumber % 10 === 0) {
//
// 		}
//
// 		//array from response
// 		const response = await getWarpLog({ link, lastID, pageNumber, gachaType: '1' });
// 		console.log('RESPONSE FROM loadWarpListFx', response);
//
// 		if (!uid && Array.isArray(response) && response.length) {
// 			uid = response[0].uid;
// 		}
//
// 		if (!region) {
// 			region = response?.region;
// 		}
// 		if (!region_time_zone) {
// 			region_time_zone = response?.region_time_zone;
// 		}
//
// 		responseData.push(...response as any);
// 		pageNumber += 1;
//
// 		if (Array.isArray(response) && response.length) {
// 			lastID = response[response.length - 1]?.id;
// 		}
//
//
// 	} while (responseData.length > 0);
//
// 	console.log('RES FUNC', responseData, uid, region, region_time_zone);
//
// });


// type GetWarpLog = {
// 	link: string;
// 	pageNumber: number;
// 	gachaType: string;
// 	lastID?: string;
// }

// async function getWarpLog({ link, pageNumber, gachaType, lastID = '' }: GetWarpLog) {
// 	try {
// 		const response = await axios.get<GachaResponse>(link, {
// 			params: {
// 				// gacha_type: gachaType,
// 				// page: pageNumber,
// 				// end_id: lastID,
// 				// size: PAGE_SIZE,
// 			},
// 		});
//
// 		console.log('RESPONSE FROM getWarpLog', response.data);
// 		if (!!response.data.data) {
// 			return response.data.data;
// 		}
// 	} catch (e) {
// 		console.error(e);
// 	}
// }