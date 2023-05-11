import React from 'react'
import PropTypes from 'prop-types'

import { StickyObject, TimeBarItem, TrackItem } from 'shared/lib/react-timelines/types';
import { SidebarHeader } from 'shared/lib/react-timelines/components/sidebar/header';
import { SidebarBody } from 'shared/lib/react-timelines/components/sidebar/body';

type Props = {
	timebar: TimeBarItem[];
	tracks: TrackItem[];
	toggleTrackOpen: () => void;
	sticky: StickyObject;
	clickTrackButton?: any
}

export const Sidebar = ({ timebar, tracks, toggleTrackOpen, sticky, clickTrackButton }: Props) => (
	<div className="rt-sidebar">
		<SidebarHeader timebar={timebar} sticky={sticky} />
		<SidebarBody tracks={tracks} toggleTrackOpen={toggleTrackOpen} clickTrackButton={clickTrackButton} />
	</div>
)

Sidebar.propTypes = {
	// timebar: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		id: PropTypes.string.isRequired,
	// 		title: PropTypes.string,
	// 	}).isRequired
	// ).isRequired,
	// tracks: PropTypes.arrayOf(PropTypes.shape({})),
	// toggleTrackOpen: PropTypes.func,
	// sticky: PropTypes.shape({}),
	clickTrackButton: PropTypes.func,
}
