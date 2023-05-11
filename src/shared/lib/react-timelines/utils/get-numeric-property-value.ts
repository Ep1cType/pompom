import { computedStyle } from 'shared/lib/react-timelines/utils/computed-style';

export const getNumericPropertyValue = (node: Element, prop: string) => parseInt(computedStyle(node).getPropertyValue(prop), 10);
