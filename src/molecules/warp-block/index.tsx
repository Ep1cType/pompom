import React from 'react';
import { useStore } from 'effector-react';
import { $warpData } from 'features/fetch-warps/model';
import { WarpCard } from 'molecules/warp-card';
import { GachaType } from 'shared/api/warp/types';
import { WarpChart } from 'molecules/warp-chart';

type Props = {
	gachaType: keyof GachaType;
}

function countWarpToEnsured(type: keyof GachaType) {
	if (type === '2') {
		return 50;
	}
	if (type === '12') {
		return 80;
	}
	return 90;
}

export const WarpBlock = ({ gachaType }: Props) => {
	const warpData = useStore($warpData);

	// const fiveStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "5").length;
	// const fourStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "4").length;
	// const threeStarCount = warpData[gachaType].filter((warp) => warp.rank_type === "3").length;


	function warpToEnsured(type: keyof GachaType) {
		const fiveStarWarpIndex = warpData[type].findIndex((warp) => warp.rank_type === '5');

		if (fiveStarWarpIndex === -1) {
			return countWarpToEnsured(type)
		}

		if (type === "2") {
			if (warpData[type].length === 50) {
				return 0
			}
		}

		return countWarpToEnsured(type) - fiveStarWarpIndex;
	}

	if (warpData[gachaType].length <= 0) {
		return (
			<p>Прыжков на данном баннере не обнаружено.</p>
		);
	}

	return (
		<div className='flex flex-col lg:flex-row'>
			<div className='flex flex-col gap-2 text-base mr-2 px-2'>
				<WarpChart warpItem={warpData[gachaType]} />
				<p>
					Прыжков до гаранта: {warpToEnsured(gachaType)}
				</p>
				<p className="opacity-70">
					Гарант на {countWarpToEnsured(gachaType)}
				</p>

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
