import { TimeBarItem } from 'shared/lib/react-timelines/types';

export const getGrid = (timebar: TimeBarItem[]) => (timebar.find(row => row.useAsGrid) || {}).cells
