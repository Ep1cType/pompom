import { createEvent, createStore } from 'effector';
import { GachaType } from 'shared/api/warp/types';

export const setWarpFilter = createEvent<keyof GachaType>();

export const $warpFilter = createStore<keyof GachaType>('2');

$warpFilter.on(setWarpFilter, (_, filter) => filter);