import React, { useState } from 'react';
import { WarpItem } from 'shared/api/warp/types';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
	warp: WarpItem;
	count: number;
}

export const WarpCard = ({warp, count}: Props) => {
	const [showImage, setShowImage] = useState(true);

	return (
		<Link
			href={warp.item_type === "Персонажи" ? `/characters/${warp.name}` : ""}
			className={clsx(
				"hover:opacity-80 flex",
				"flex items-center gap-2",
				warp.rank_type === '3' && 'text-three-from',
				warp.rank_type === '4' && 'text-four-from',
				warp.rank_type === '5' && 'text-five-from',
			)}
		>
			{count}
			{showImage && (
				<Image
					className="aspect-square rounded-full w-12 object-cover"
					width={256}
					height={256}
					src={`/characters/${warp.name}.webp`}
					onError={() => setShowImage(false)}
					alt={warp.name}
				/>
			)}
			<p className={
				clsx(
					' inline text-base'
				)
			}>
				{warp.name}
			</p>
		</Link>
	);
};
