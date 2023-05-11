import React from 'react';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { TimeBarCell } from 'shared/lib/react-timelines/types';
import clsx from 'clsx';

interface Props extends TimeBarCell {
	time: CreateTimeReturn;
}

export const Cell = ({ time, ...props }: Props) => {
	return (
		<div
			className={clsx(
				"absolute text-white text-center border-l  rt-timebar__cell",
				props.id.toString().includes("m") ? "border-l-white" : "border-l-transparent"
			)} style={time.toStyleLeftAndWidth(props.start,  props.end)}>
			<span className="sticky left-0">{props.title}</span>
		</div>
	)
}

// Cell.propTypes = {
// 	time: PropTypes.shape({
// 		toStyleLeftAndWidth: PropTypes.func,
// 	}),
// 	title: PropTypes.string.isRequired,
// 	start: PropTypes.instanceOf(Date).isRequired,
// 	end: PropTypes.instanceOf(Date).isRequired,
// }
