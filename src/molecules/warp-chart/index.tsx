import React from 'react';
import { WarpItem } from 'shared/api/warp/types';
import { Doughnut } from 'react-chartjs-2';
import {
	ChartData,
	ChartType,
	DefaultDataPoint,
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
	warpItem: WarpItem[];
};

export const WarpChart = ({ warpItem }: Props) => {
	return (
		<div className="relative w-fit h-fit">
			<Doughnut data={warpChartDataAdapter(warpItem)} />
			<span className="absolute left-1/2 top-1/2 -translate-x-1/2">
				Всего: {warpItem.length}
			</span>
		</div>
	);
};

function warpChartDataAdapter(
	warpItem: WarpItem[]
): ChartData<'doughnut', DefaultDataPoint<ChartType>, unknown> {
	const fiveStarCount = warpItem.filter(
		(warp) => warp.rank_type === '5'
	).length;
	const fourStarCount = warpItem.filter(
		(warp) => warp.rank_type === '4'
	).length;
	const threeStarCount = warpItem.filter(
		(warp) => warp.rank_type === '3'
	).length;

	return {
		labels: ['5*', '4*', '3*'],
		datasets: [
			{
				label: 'Количество:',
				data: [fiveStarCount, fourStarCount, threeStarCount],
				backgroundColor: ['#D0AA6E', '#9C65D7', '#4981C6'],
				borderWidth: 0,
			},
		],
	};
}
