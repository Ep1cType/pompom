import React from 'react';
import dynamic from 'next/dynamic';
import { useStore, useUnit } from 'effector-react';
import {
	$formDisabled,
	$warpLink,
	$warpLinkSubmittedError,
	warpChanged,
	warpLinkSubmitted,
} from 'features/fetch-warps/model';
import clsx from 'clsx';
const WarpInfo = dynamic(() =>
	import('organisms/warp-info').then((mod) => mod.WarpInfo),
	{ssr: false}
);

const WarpPage = () => {
	const [warpLink, submit, disabled, error] = useUnit([$warpLink, warpLinkSubmitted, $formDisabled, $warpLinkSubmittedError])

	return (
		<>
			<section className="container mx-auto px-4 py-5">
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered text-blue-950 input-accent input-lg w-full max-w-xs"
					value={warpLink}
					onChange={event => warpChanged(event.target.value)}
					disabled={disabled}
				/>
				<button
					className={clsx("btn btn-accent", disabled && "loading")}
					onClick={submit}
					disabled={disabled}
				>
					SUBMIT
				</button>
			</section>
			<WarpInfo />
		</>
	);
};

export default WarpPage;