import React from 'react';
import { useStore } from 'effector-react';
import { $warpData } from 'features/fetch-warps/model';
import { gachaTypeList } from 'shared/api/warp/request';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { WarpCard } from 'molecules/warp-card';
import { WarpBlock } from 'molecules/warp-block';

export const WarpInfo = () => {
	return (
		<section className='container mx-auto px-4 grid grid-cols-4 gap-2'>
			{gachaTypeList.map((el) => (
				<WarpBlock key={el} gachaType={el} />
			))}
		</section>
	);
};
