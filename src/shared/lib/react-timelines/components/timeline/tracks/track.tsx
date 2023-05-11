import React from 'react'

import { Element } from 'shared/lib/react-timelines/components/timeline/tracks/element';
import { Tracks } from 'shared/lib/react-timelines/components/timeline/tracks/index';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { TrackItem } from 'shared/lib/react-timelines/types';

type Props = {
	time: CreateTimeReturn;
	tracks?: TrackItem[];
	clickElement?: (any: any) => void;
	elements: TrackItem[]
	isOpen?: boolean;
}

export const Track = ({ time, elements, isOpen, tracks, clickElement }: Props) => {
	return (
		<div className="tr-track">
			<div className="relative h-[70px] bg-blue-950 rt-track__elements">
				{elements
					.filter(({ start, end }) => end > start)
					.map(element => (
						<Element key={element.id} time={time} clickElement={clickElement} {...element} />
					))}
			</div>
			{isOpen && tracks && tracks.length > 0 && <Tracks time={time} tracks={tracks} clickElement={clickElement} />}
		</div>
	)
}

// 	.rt-track__elements {
// 	position: relative;
// 	height: $react-timelines-track-height + $react-timelines-border-width; 60px
// 	border-bottom: $react-timelines-border-width solid $react-timelines-keyline-color;
// }
//



// Track.propTypes = {
// 	time: PropTypes.shape({}).isRequired,
// 	isOpen: PropTypes.bool,
// 	elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
// 	tracks: PropTypes.arrayOf(PropTypes.shape({})),
// 	clickElement: PropTypes.func,
// }
//
// Track.defaultProps = {
// 	clickElement: undefined,
// }

// export default Track
