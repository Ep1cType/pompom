import React from 'react';
import { useUnit } from 'effector-react';
import { $warpFilter, setWarpFilter } from 'features/filter-warps/model';
import { GachaType } from 'shared/api/warp/types';
import clsx from 'clsx';

export const FilterWarps = () => {
	const [currentWarpFilter] = useUnit([$warpFilter]);

	function onChangeFilter(key: keyof GachaType) {
		return () => {
			setWarpFilter(key);
		};
	}

	return (
		<ul className='flex flex-col gap-3'>
			{filterList.map((item) => (
				<li
					key={item.key}
					className={clsx(
						'btn hover:bg-blue-900/75 bg-blue-900 px-2 py-1 rounded-r-2xl cursor-pointer hover:opacity-80',
						currentWarpFilter === item.key && 'btn-disabled',
					)}
					onClick={onChangeFilter(item.key)}
				>
					{item.value}
				</li>
			))}
		</ul>
	);
};

const filterList: { key: keyof GachaType, value: GachaType[keyof GachaType] }[] = [
	{
		key: '2',
		value: 'Отправной прыжок',
	},
	{
		key: '1',
		value: 'Стандартный прыжок',
	},
	{
		key: '11',
		value: 'Прыжок события: Персонаж',
	},
	{
		key: '12',
		value: 'Прыжок события: Световой конус',
	},
];
