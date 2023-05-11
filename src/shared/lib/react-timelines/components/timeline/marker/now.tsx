import React from 'react';

import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { getDayMonth } from 'shared/lib/react-timelines/utils/format-date';
import { Marker } from 'shared/lib/react-timelines/components/timeline/marker/index';

type Props = {
	time: CreateTimeReturn;
	now: Date;
	visible: boolean;
}

//TODO: Поменять локаль
export const NowMarker = ({ time, now, visible }: Props) => {
	return (
		<Marker modifier='now' x={time.toX(now)} visible={visible}>
			<div>
				<div>Сегодня</div>
				<strong>{getDayMonth(now as unknown as Date)}</strong>
			</div>
		</Marker>
	);
};

// class NowMarker extends PureComponent {
// 	render() {
// 		const { now, time, visible } = this.props
// 		return (
// 			<Marker modifier="now" x={time.toX(now)} visible={visible}>
// 				<div>
// 					<div>Today</div>
// 					<strong>{getDayMonth(now)}</strong>
// 				</div>
// 			</Marker>
// 		)
// 	}
// }
//
// NowMarker.propTypes = {
// 	time: PropTypes.shape({
// 		toX: PropTypes.func.isRequired,
// 	}).isRequired,
// 	visible: PropTypes.bool.isRequired,
// 	now: PropTypes.instanceOf(Date).isRequired,
// }
//
// export default NowMarker
