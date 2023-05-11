import React from 'react'
import PropTypes from 'prop-types'
import TrackKeys from 'shared/lib/react-timelines/components/sidebar/track-keys';


export const SidebarBody = ({ tracks, toggleTrackOpen, clickTrackButton }: any) => (
	<div className="rt-sidebar__body">
		<TrackKeys tracks={tracks} toggleOpen={toggleTrackOpen} clickTrackButton={clickTrackButton} />
	</div>
)

SidebarBody.propTypes = {
	tracks: PropTypes.arrayOf(PropTypes.shape({})),
	toggleTrackOpen: PropTypes.func,
	clickTrackButton: PropTypes.func,
}

export default Body
