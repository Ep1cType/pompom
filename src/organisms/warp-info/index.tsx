import React from 'react';
import { useStore } from 'effector-react';
import { $warpData } from 'features/fetch-warps/model';
import { gachaTypeList } from 'shared/api/warp/request';
import clsx from 'clsx';

export const WarpInfo = () => {
	const warpData = useStore($warpData);
	console.log("WARP DATA", warpData)

	return (
		<section className="container mx-auto px-4 grid grid-cols-4">
			{gachaTypeList.map((el) => (
				<div key={el}>
					{warpData[el].length > 0 && (
						<p>Количество прыжков: {warpData[el].length}</p>
					)}
					<div className="flex flex-col max-h-[500px] overflow-y-auto scrollBar" key={el}>
						{warpData[el].map((warpItem, index) => (
							<p
								className={clsx(
									"bg-clip-text text-transparent bg-gradient-to-r",
									warpItem.rank_type === "3" && "from-three-from to-three-to",
									warpItem.rank_type === "4" && "from-four-from to-four-to",
									warpItem.rank_type === "5" && "from-five-from to-five-to"
								)}
								key={index}>{warpItem.name} {warpItem.rank_type}</p>
						))}
					</div>
				</div>
			))}
		</section>
	);
};
