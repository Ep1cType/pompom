import { createEvent, createStore, sample, attach } from 'effector';
import { loadWarpListFx } from 'shared/api/warp/request';
import { or } from 'patronum';

const fetchWarpListFx = attach({ effect: loadWarpListFx });

export const warpChanged = createEvent<string>();
export const warpLinkSubmitted = createEvent();

export const $warpLink = createStore('');
export const $fetchWarpListPending = fetchWarpListFx.pending;

export const $formDisabled = or($fetchWarpListPending)


$warpLink.on(warpChanged, (_, link) => link);

sample({
	clock: warpLinkSubmitted,
	source: $warpLink,
	target: fetchWarpListFx,
});

