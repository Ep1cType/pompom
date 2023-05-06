import React from 'react';
import { useUnit } from 'effector-react';
import { $formDisabled, $warpLink, warpChanged, warpLinkSubmitted } from 'features/fetch-warps/model';
import clsx from 'clsx';

const WarpPage = () => {
	const [warpLink, submit, disabled] = useUnit([$warpLink, warpLinkSubmitted, $formDisabled])

	return (
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
	);
};

export default WarpPage;