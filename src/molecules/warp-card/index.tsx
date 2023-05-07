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
					className={clsx(
						"aspect-square  w-12 ",
						warp.item_type === "Персонажи" ? "object-cover rounded-full" : "object-contain"
					)}
					width={256}
					height={256}
					src={`/${warp.item_type === "Персонажи" ? "characters" : "cones"}/${warp.name}.webp`}
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
