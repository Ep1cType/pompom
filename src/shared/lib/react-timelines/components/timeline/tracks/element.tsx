import React, { HTMLAttributes } from 'react';
import { BasicElement } from 'shared/lib/react-timelines/components/elements/basic';
import { TrackItem } from 'shared/lib/react-timelines/types';
import { CreateTimeReturn } from 'shared/lib/react-timelines/utils/time';
import { ImageDataResponse } from 'shared/api/types';

interface Props extends TrackItem {
	time: CreateTimeReturn;
	clickElement?: (any: any) => void;
	tooltip?: string;
	classes?: string[]
	dataSet?: HTMLAttributes<HTMLDivElement>;
	image?: ImageDataResponse;

}
export const Element = (props: Props) => {
	const { time, style, title, start, end, classes, dataSet, tooltip, clickElement, image } = props
	const handleClick = () => {
		if (clickElement) {
			clickElement(props)
		}
	}

	const elementStyle = {
		...time.toStyleLeftAndWidth(start, end),
		...(clickElement ? { cursor: 'pointer' } : {}),
	}

	return (
		<div className="absolute top-[10px] h-[40px] z-10 cursor-pointer rt-track__element" style={elementStyle} onClick={clickElement ? handleClick : undefined}>
			<BasicElement
				title={title}
				start={start}
				end={end}
				style={style}
				classes={classes}
				dataSet={dataSet}
				tooltip={tooltip}
				image={image}
			/>
		</div>
	)
}

// .rt-track__element {
// 	position: absolute;
// 	height: $react-timelines-track-height - 2 * $react-timelines-element-spacing; 60px - 2 * 10
// 	top: $react-timelines-element-spacing;
// }


//
// Element.propTypes = {
// 	time: PropTypes.shape({
// 		toStyleLeftAndWidth: PropTypes.func,
// 	}).isRequired,
// 	style: PropTypes.shape({}),
// 	classes: PropTypes.arrayOf(PropTypes.string.isRequired),
// 	dataSet: PropTypes.shape({}),
// 	title: PropTypes.string,
// 	start: PropTypes.instanceOf(Date).isRequired,
// 	end: PropTypes.instanceOf(Date).isRequired,
// 	tooltip: PropTypes.string,
// 	clickElement: PropTypes.func,
// }
//
// Element.defaultTypes = {
// 	clickElement: undefined,
// }
//
// export default Element
