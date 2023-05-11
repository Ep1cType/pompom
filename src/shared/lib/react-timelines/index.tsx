import React, { Component, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

// import Controls from './components/Controls'
import { createTime } from 'shared/lib/react-timelines/utils/time';
import { Layout } from 'shared/lib/react-timelines/components/layout';

const UNKNOWN_WIDTH = -1;

export type Scale = {
	start: Date; //PropTypes.instanceOf(Date)
	end: Date; //PropTypes.instanceOf(Date)
	zoom: number;
	zoomMin: number;
	zoomMax: number;
	minWidth?: number;
	viewportWidth?: number;
}

type Props = {
	scale: Scale
	isOpen: boolean;
	toggleOpen: () => void;
	zoomIn?: () => void;
	zoomOut?: () => void;
	clickElement: (any: any) => void;
	clickTrackButton: (any: any) => void;
	timebar: any[]; //PropTypes.arrayOf(PropTypes.shape({})).isRequired
	tracks: any[]; //PropTypes.arrayOf(PropTypes.shape({})).isRequired
	now: Date; //PropTypes.instanceOf(Date),
	toggleTrackOpen: () => void;
	enableSticky: boolean;
	scrollToNow: boolean;
}

export interface HandleLayoutChange {
	timelineViewportWidth: number;
	sidebarWidth: number;
	callback?: any;
}

export const TimeLine = (
	{
		scale,
		enableSticky,
		now,
		tracks,
		timebar,
		toggleTrackOpen,
		scrollToNow,
		isOpen,
		clickElement,
		clickTrackButton,
	}: Props) => {
	// const timelineViewportWidth = UNKNOWN_WIDTH;
	// const sidebarWidth = UNKNOWN_WIDTH;
	const [timelineViewportWidth, setTimelineViewportWidth] = useState(UNKNOWN_WIDTH);
	const [sidebarWidth, setSidebarWidth] = useState(UNKNOWN_WIDTH);
	const [time, setTime] = useState(createTime({ ...scale, viewportWidth: timelineViewportWidth }));

	useEffect(() => {
		const newTime = createTime({ ...scale, viewportWidth: timelineViewportWidth });
		setTime(newTime);
	}, [scale, timelineViewportWidth]);

	function handleLayoutChange({ timelineViewportWidth, sidebarWidth, callback }: HandleLayoutChange) {
		const time = createTime({ ...scale, viewportWidth: timelineViewportWidth });
		setTime(time);
		setTimelineViewportWidth(timelineViewportWidth);
		setSidebarWidth(sidebarWidth);
		callback()
	}

	return (
		<div className='relative z-[1] text-four-from'>
			{/*<Controls*/}
			{/*	isOpen={isOpen}*/}
			{/*	toggleOpen={toggleOpen}*/}
			{/*	zoomIn={zoomIn}*/}
			{/*	zoomOut={zoomOut}*/}
			{/*	zoom={zoom}*/}
			{/*	zoomMin={zoomMin}*/}
			{/*	zoomMax={zoomMax}*/}
			{/*/>*/}
			<Layout
				enableSticky={enableSticky}
				now={now}
				tracks={tracks}
				timebar={timebar}
				toggleTrackOpen={toggleTrackOpen}
				scrollToNow={scrollToNow}
				time={time}
				isOpen={isOpen}
				onLayoutChange={handleLayoutChange}
				timelineViewportWidth={timelineViewportWidth}
				sidebarWidth={sidebarWidth}
				clickElement={clickElement}
			/>
		</div>
	);

};

// export class Timeline extends Component {
// 	constructor(props: Props) {
// 		super(props);
// 		const timelineViewportWidth = UNKNOWN_WIDTH;
// 		const sidebarWidth = UNKNOWN_WIDTH;
// 		this.state = {
// 			time: createTime({ ...props.scale, viewportWidth: timelineViewportWidth }),
// 			timelineViewportWidth,
// 			sidebarWidth,
// 		};
// 	}
//
// 	// eslint-disable-next-line camelcase
// 	UNSAFE_componentWillReceiveProps(nextProps) {
// 		const { scale } = this.props;
// 		const { timelineViewportWidth } = this.state;
//
// 		if (nextProps.scale !== scale) {
// 			const time = createTime({
// 				...nextProps.scale,
// 				viewportWidth: timelineViewportWidth,
// 			});
// 			this.setState({ time });
// 		}
// 	}
//
// 	handleLayoutChange = ({ timelineViewportWidth, sidebarWidth }, cb) => {
// 		const { scale } = this.props;
// 		const time = createTime({
// 			...scale,
// 			viewportWidth: timelineViewportWidth,
// 		});
// 		this.setState(
// 			{
// 				time,
// 				timelineViewportWidth,
// 				sidebarWidth,
// 			},
// 			cb,
// 		);
// 	};
//
// 	render() {
// 		const {
// 			isOpen = true,
// 			toggleOpen,
// 			zoomIn,
// 			zoomOut,
// 			scale: { zoom, zoomMin, zoomMax },
// 			tracks,
// 			now,
// 			timebar,
// 			toggleTrackOpen,
// 			enableSticky = false,
// 			scrollToNow,
// 		} = this.props;
//
// 		const { time, timelineViewportWidth, sidebarWidth } = this.state;
//
// 		const { clickElement, clickTrackButton } = this.props;
//
// 		return (
// 			<div className='rt'>
// 				{/*<Controls*/}
// 				{/*	isOpen={isOpen}*/}
// 				{/*	toggleOpen={toggleOpen}*/}
// 				{/*	zoomIn={zoomIn}*/}
// 				{/*	zoomOut={zoomOut}*/}
// 				{/*	zoom={zoom}*/}
// 				{/*	zoomMin={zoomMin}*/}
// 				{/*	zoomMax={zoomMax}*/}
// 				{/*/>*/}
// 				<Layout
// 					enableSticky={enableSticky}
// 					now={now}
// 					tracks={tracks}
// 					timebar={timebar}
// 					toggleTrackOpen={toggleTrackOpen}
// 					scrollToNow={scrollToNow}
// 					time={time}
// 					isOpen={isOpen}
// 					onLayoutChange={this.handleLayoutChange}
// 					timelineViewportWidth={timelineViewportWidth}
// 					sidebarWidth={sidebarWidth}
// 					clickElement={clickElement}
// 					clickTrackButton={clickTrackButton}
// 				/>
// 			</div>
// 		);
// 	}
// }

// Timeline.propTypes = {
// 	scale: PropTypes.shape({
// 		start: PropTypes.instanceOf(Date).isRequired,
// 		end: PropTypes.instanceOf(Date).isRequired,
// 		zoom: PropTypes.number.isRequired,
// 		zoomMin: PropTypes.number,
// 		zoomMax: PropTypes.number,
// 		minWidth: PropTypes.number,
// 	}),
// 	isOpen: PropTypes.bool,
// 	toggleOpen: PropTypes.func,
// 	zoomIn: PropTypes.func,
// 	zoomOut: PropTypes.func,
// 	clickElement: PropTypes.func,
// 	clickTrackButton: PropTypes.func,
// 	timebar: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
// 	tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
// 	now: PropTypes.instanceOf(Date),
// 	toggleTrackOpen: PropTypes.func,
// 	enableSticky: PropTypes.bool,
// 	scrollToNow: PropTypes.bool,
// };
