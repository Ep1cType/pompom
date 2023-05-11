import React from 'react'
import PropTypes from 'prop-types'
import TrackKey from 'shared/lib/react-timelines/components/sidebar/track-keys/track-key';


const TrackKeys = ({ tracks, toggleOpen, clickTrackButton }: any) => (
	<ul className="rt-track-keys">
		{tracks.map((track: any) => (
			<TrackKey key={track.id} track={track} toggleOpen={toggleOpen} clickTrackButton={clickTrackButton} />
		))}
	</ul>
)

TrackKeys.propTypes = {
	tracks: PropTypes.arrayOf(PropTypes.shape({})),
	toggleOpen: PropTypes.func,
	clickTrackButton: PropTypes.func,
}

export default TrackKeys
