import React from 'react'
import { Row } from 'shared/lib/react-timelines/components/timeline/timebar/row';
import { TimeBarItem } from 'shared/lib/react-timelines/types';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';

type Props = {
	rows: TimeBarItem[]
	time: CreateTimeReturn
}

export const Timebar = ({ time, rows }: Props) => (
	<div className="bg-transparent rt-timebar">
		{rows.map(({ id, title, cells, style }) => (
			<Row key={id} time={time} cells={cells} style={style} />
		))}
	</div>
)

// Timebar.propTypes = {
// 	time: PropTypes.shape({}).isRequired,
// 	rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
// }
