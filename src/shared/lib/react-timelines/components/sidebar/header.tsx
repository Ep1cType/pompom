import React from 'react';
import { StickyObject, TimeBarItem } from 'shared/lib/react-timelines/types';
import clsx from 'clsx';
// import PropTypes from 'prop-types'

type Props = {
	timebar: TimeBarItem[]
	sticky: StickyObject;
}

export const SidebarHeader = ({ timebar, sticky: { isSticky, sidebarWidth, headerHeight } }: Props) => (
	<div style={isSticky ? { paddingTop: headerHeight } : {}}>
		<div
			className={clsx('rt-sidebar__header', isSticky && 'rt-is-sticky')}
			style={isSticky ? { width: sidebarWidth } : {}}
		>
			{timebar.map(({ id, title }) => (
				<div key={id} className='rt-timebar-key'>
					{title}
				</div>
			))}
		</div>
	</div>
);

// Header.propTypes = {
// 	sticky: PropTypes.shape({
// 		isSticky: PropTypes.bool.isRequired,
// 		headerHeight: PropTypes.number.isRequired,
// 		sidebarWidth: PropTypes.number.isRequired,
// 	}),
// 	timebar: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.string.isRequired,
// 			title: PropTypes.string,
// 		}).isRequired
// 	).isRequired,
// }
