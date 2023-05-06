import { createEffect } from 'effector';
import axios from 'axios';
import { GachaResponse } from 'shared/api/warp/types';

const PAGE_SIZE = 20;

export const loadWarpListFx = createEffect<string, any, any>(async (link) => {
	let pageNumber = 1;
	let list = [];
	let responseData = [];
	let uid = '';
	let region = '';
	let region_time_zone = '';
	let lastID = '0';


	do {
		if (pageNumber % 10 === 0) {

		}
		const response = await getWarpLog({ link, lastID, pageNumber, gachaType: '1' });
		console.log("RESPONSE FROM loadWarpListFx", response)
		responseData.push(...response as any);
		pageNumber += 1;


	} while (responseData.length > 0);

});


type GetWarpLog = {
	link: string;
	pageNumber: number;
	gachaType: string;
	lastID?: string;
}

async function getWarpLog({ link, pageNumber, gachaType, lastID = '' }: GetWarpLog) {
	try {
		const response = await axios.get<GachaResponse>(link, {
			params: {
				gacha_type: gachaType,
				page: pageNumber,
				end_id: lastID,
				size: PAGE_SIZE,
			},
		});
		console.log("RESPONSE FROM getWarpLog", response.data)
		if (!!response.data.data) {
			return response.data.data;
		}
	} catch (e) {
		console.error(e);
	}
}