import React, { MouseEvent, useState } from 'react';

import { NowMarker } from 'shared/lib/react-timelines/components/timeline/marker/now';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { PointerMarker } from 'shared/lib/react-timelines/components/timeline/marker/pointer';
import { TimeBarItem, TrackItem } from 'shared/lib/react-timelines/types';
import { getGrid } from 'shared/lib/react-timelines/utils/get-grid';
import { TimelineHeader } from 'shared/lib/react-timelines/components/timeline/header';
import { TimelineBody } from 'shared/lib/react-timelines/components/timeline/body';
import { StickyObject } from 'shared/lib/react-timelines/components/layout';
import { getMouseX } from 'shared/lib/react-timelines/utils/get-mouse-x';

type Props = {
	now: Date;
	time: CreateTimeReturn;
	timebar: TimeBarItem[];
	tracks: TrackItem[];
	sticky: StickyObject;
	clickElement?: (any: any) => void;
}

export const TimelineMain = ({ now, time, timebar, tracks, sticky, clickElement }: Props) => {
	const [pointerDate, setPointerDate] = useState<Date | null>(null);
	const [pointerVisible, setPointerVisible] = useState(false);
	const [pointerHighlighted, setPointerHighlighted] = useState(false);

	const grid = getGrid(timebar);

	function handleMouseMove(e: MouseEvent) {
		const newPointerDate = time.fromX(getMouseX(e));
		setPointerDate(newPointerDate);
	}

	function handleMouseLeave() {
		setPointerHighlighted(false)
	}

	function 	handleMouseEnter() {
		setPointerVisible(true);
		setPointerHighlighted(true)
	}

	return (
		<div className='relative rt-timeline' style={{ width: time.timelineWidthStyle }}>
			{now && <NowMarker now={now} visible time={time} />}
			{/*{pointerDate && (*/}
			{/*	<PointerMarker date={pointerDate} time={time} visible={pointerVisible} highlighted={pointerHighlighted} />*/}
			{/*)}*/}
			<TimelineHeader
				time={time}
				timebar={timebar}
				onMove={handleMouseMove}
				onEnter={handleMouseEnter}
				onLeave={handleMouseLeave}
				width={time.timelineWidthStyle}
				sticky={sticky}
			/>
			<TimelineBody time={time} grid={grid} tracks={tracks} clickElement={clickElement} />
		</div>
	);
};

// class Timeline extends Component {
// 	constructor(props) {
// 		super(props);
//
// 		this.state = {
// 			pointerDate: null,
// 			pointerVisible: false,
// 			pointerHighlighted: false,
// 		};
// 	}
//
// 	handleMouseMove = e => {
// 		const { time } = this.props;
// 		this.setState({ pointerDate: time.fromX(getMouseX(e)) });
// 	};
//
// 	handleMouseLeave = () => {
// 		this.setState({ pointerHighlighted: false });
// 	};
//
// 	handleMouseEnter = () => {
// 		this.setState({ pointerVisible: true, pointerHighlighted: true });
// 	};
//
// 	render() {
// 		const { now, time, timebar, tracks, sticky, clickElement } = this.props;
//
// 		const { pointerDate, pointerVisible, pointerHighlighted } = this.state;
//
// 		const grid = getGrid(timebar);
//
// 		return (
// 			<div className='rt-timeline' style={{ width: time.timelineWidthStyle }}>
// 				{now && <NowMarker now={now} visible time={time} />}
// 				{pointerDate && (
// 					<PointerMarker date={pointerDate} time={time} visible={pointerVisible} highlighted={pointerHighlighted} />
// 				)}
// 				<Header
// 					time={time}
// 					timebar={timebar}
// 					onMove={this.handleMouseMove}
// 					onEnter={this.handleMouseEnter}
// 					onLeave={this.handleMouseLeave}
// 					width={time.timelineWidthStyle}
// 					sticky={sticky}
// 				/>
// 				<TimelineBody time={time} grid={grid} tracks={tracks} clickElement={clickElement} />
// 			</div>
// 		);
// 	}
// }
//
// Timeline.propTypes = {
// 	now: PropTypes.instanceOf(Date),
// 	time: PropTypes.shape({
// 		fromX: PropTypes.func.isRequired,
// 		toStyleLeftAndWidth: PropTypes.func,
// 		timelineWidthStyle: PropTypes.string,
// 	}).isRequired,
// 	timebar: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.string.isRequired,
// 			title: PropTypes.string,
// 		}).isRequired,
// 	).isRequired,
// 	tracks: PropTypes.arrayOf(PropTypes.shape({})),
// 	sticky: PropTypes.shape({}),
// 	clickElement: PropTypes.func,
// };
//
// export default Timeline;
