import React from 'react';
import { useStore } from 'effector-react';
import { $warpData } from 'features/fetch-warps/model';
import { WarpCard } from 'molecules/warp-card';
import { GachaTypeList } from 'shared/api/warp/types';
import { WarpChart } from 'molecules/warp-chart';

type Props = {
	gachaType: GachaTypeList;
}

export const WarpBlock = ({gachaType}: Props) => {
	const warpData = useStore($warpData);

	// const fiveStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "5").length;
	// const fourStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "4").length;
	// const threeStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "3").length;

	if (warpData[gachaType].length <= 0) {
		return (
			<p>Прыжков на данном баннере не обнаружено.</p>
		)
	}

	return (
		<div className="flex flex-col lg:flex-row">
			<div className='flex flex-col gap-2 text-base mr-2 px-2'>
				<WarpChart warpItem={warpData[gachaType]} />
				{/*{warpData[gachaType].length > 0 && (*/}
				{/*	<p>Всего прыжков: {warpData[gachaType].length}</p>*/}
				{/*)}*/}
				{/*<p className='text-five-from'>*/}
				{/*	Количество 5*: {fiveStarCount}*/}
				{/*</p>*/}
				{/*<p className='text-four-from'>*/}
				{/*	Количество 4*: {fourStarCount}*/}
				{/*</p>*/}
				{/*<p className='text-three-from'>*/}
				{/*	Количество 3*: {threeStarCount}*/}
				{/*</p>*/}
			</div>
			<div className='flex flex-grow flex-col gap-2 px-2 py-2 max-h-[500px] overflow-y-auto scrollBar shadow-xl'>
				{warpData[gachaType].map((warpItem, index) => (
					<WarpCard key={index} warp={warpItem} count={warpData[gachaType].length - index} />
				))}
			</div>
		</div>
	);
};
