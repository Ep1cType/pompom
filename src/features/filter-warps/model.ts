import { createEvent, createStore } from 'effector';
import { GachaTypeList } from 'shared/api/warp/types';

export const setWarpFilter = createEvent<GachaTypeList>();

export const $warpFilter = createStore<GachaTypeList>('2');

$warpFilter.on(setWarpFilter, (_, filter) => filter);