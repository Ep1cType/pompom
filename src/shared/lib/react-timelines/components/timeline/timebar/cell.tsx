import React from 'react';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { TimeBarCell } from 'shared/lib/react-timelines/types';
import clsx from 'clsx';

interface Props extends TimeBarCell {
	time: CreateTimeReturn;
}

export const Cell = ({ time, ...props }: Props) => {

	if (props.id.toString().includes("m")) {
		return (
			<div className={clsx(
				"absolute text-white border-l px-2.5  rt-timebar__cell "
			)} style={time.toStyleLeftAndWidth(props.start,  props.end)}>
				{/*<div className="relative whitespace-nowrap text-start">*/}
				{/*	<div>*/}
						<span className="sticky left-2.5">{props.title}</span>
					{/*</div>*/}
				{/*</div>*/}
			</div>
		)
	}


	return (
		<div
			className={clsx(
				"absolute text-white text-center border-l border-l-transparent rt-timebar__cell",
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
