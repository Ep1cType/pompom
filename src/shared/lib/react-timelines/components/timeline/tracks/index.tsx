import React from 'react';
import { Track } from 'shared/lib/react-timelines/components/timeline/tracks/track';
import { TrackItem } from 'shared/lib/react-timelines/types';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';


type Props = {
	tracks: TrackItem[]
	time: CreateTimeReturn;
	clickElement?: (any: any) => void;
}

export const Tracks = ({ time, tracks, clickElement }: Props) => (
	<div className="">
		{tracks.map(({ id, elements, isOpen, tracks: children }) => (
			<Track key={id} time={time} elements={elements} isOpen={isOpen} tracks={children} clickElement={clickElement} />
		))}
	</div>
);

// Tracks.propTypes = {
// 	time: PropTypes.shape({}).isRequired,
// 	tracks: PropTypes.arrayOf(PropTypes.shape({})),
// 	clickElement: PropTypes.func,
// }
//
// export default Tracks
