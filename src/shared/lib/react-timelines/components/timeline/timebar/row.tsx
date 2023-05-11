import React, { CSSProperties } from 'react';
import { Cell } from 'shared/lib/react-timelines/components/timeline/timebar/cell';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { TimeBarCell } from 'shared/lib/react-timelines/types';


type Props = {
	time: CreateTimeReturn;
	cells: TimeBarCell[]
	style: CSSProperties;
}

export const Row = ({ time, cells, style }: Props) => {
	console.log("CELLS", cells)

	return (
		<div className="relative overflow-hidden h-[25px] rt-timebar__row" style={style}>
			{cells.map(cell => (
				<Cell key={cell.id} time={time} {...cell} />
			))}
		</div>
	)
}

// position: relative;
// height: $react-timelines-header-row-height + $react-timelines-border-width; 40px +
// overflow: hidden;
// line-height: $react-timelines-header-row-height;
// border-bottom: $react-timelines-border-width solid $react-timelines-keyline-color;
// &:last-child {
// 	border-bottom-color: $react-timelines-header-separator-color;
// }

// Row.propTypes = {
// 	time: PropTypes.shape({}).isRequired,
// 	cells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
// 	style: PropTypes.shape({}),
// }
