import React from 'react';
import { useStore } from 'effector-react';
import { $warpData } from 'features/fetch-warps/model';
import { WarpCard } from 'molecules/warp-card';
import { GachaTypeList } from 'shared/api/warp/types';

type Props = {
	gachaType: GachaTypeList;
}

export const WarpBlock = ({gachaType}: Props) => {
	const warpData = useStore($warpData);

	const fiveStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "5");
	const fourStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "4");
	const threeStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "3");

	return (
		<div>
			<div className="flex flex-col gap-2 text-base mb-2 border-b border-b-white rounded-xl px-2">
				{warpData[gachaType].length > 0 && (
					<p>Количество прыжков: {warpData[gachaType].length}</p>
				)}
				<p className="text-five-from">
					Количество 5*: {fiveStarCount.length}
				</p>
				<p className="text-four-from">
					Количество 4*: {fourStarCount.length}
				</p>
				<p className="text-three-from">
					Количество 3*: {threeStarCount.length}
				</p>
			</div>
			<div className='flex flex-col gap-2 px-2 py-2 max-h-[500px] overflow-y-auto scrollBar'>
				{warpData[gachaType].map((warpItem, index) => (
					<WarpCard key={index} warp={warpItem} count={warpData[gachaType].length - index} />
				))}
			</div>
		</div>
	);
};
