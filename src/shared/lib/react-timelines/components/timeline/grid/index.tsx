import React from 'react'
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { TimeBarCell } from 'shared/lib/react-timelines/types';

type Props = {
	time: CreateTimeReturn
	grid: TimeBarCell[]
}

export const Grid = ({ time, grid }: Props) => {
	return (
		<div className="timeline_grid">
			{grid.map(({ id, start, end }) => (
				<div key={id} className="timeline_grid__cell z-[3] flex justify-center" style={time.toStyleLeftAndWidth(start, end)}>
					{/*<div className="h-full w-[1px] bg-gray-300 opacity-20" />*/}
				</div>
			))}
		</div>
	)
}

// Grid.propTypes = {
// 	time: PropTypes.shape({
// 		toStyleLeftAndWidth: PropTypes.func,
// 	}).isRequired,
// 	grid: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			start: PropTypes.instanceOf(Date).isRequired,
// 			end: PropTypes.instanceOf(Date).isRequired,
// 		})
// 	).isRequired,
// }
