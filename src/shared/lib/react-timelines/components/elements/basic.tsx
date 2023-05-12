import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { createClasses } from 'shared/lib/react-timelines/utils/classes';
import { getDayMonth } from 'shared/lib/react-timelines/utils/format-date';
import clsx from 'clsx';
import { ImageDataResponse } from 'shared/api/types';
import { ImageWithDomain } from 'shared/ui/image-with-domain';

const buildDataAttributes = (attributes: HTMLAttributes<HTMLDivElement> = {}) => {
	const value: HTMLAttributes<HTMLDivElement> = {}
	Object.keys(attributes).forEach(name => {
		// @ts-ignore
		value[`data-${name}`] = attributes[name]
	})
	return value
}

type Props = {
	title: ReactNode;
	start: Date;
	end: Date;
	style: CSSProperties
	classes?: string[]
	dataSet?: HTMLAttributes<HTMLDivElement>;
	tooltip?: string;
	image?: ImageDataResponse;
	link?: string;
}

// $height: $react-timelines-track-height - 2 * $react-timelines-element-spacing; 60 -
//
// height: $height;
// line-height: $height;
// background: #06f;

// padding: 0 10px;
// font-weight: bold;


// padding: 10px;
// line-height: 1.3;
// text-align: left;
// background: $react-timelines-text-color;
// color: white;
// transform: translateX(-50%) scale(0);
// pointer-events: none;

export const BasicElement = ({ title, start, end, style, classes, dataSet, tooltip, image, link }: Props) => {
	return (
		<div
			className={createClasses(
				'relative text-white text-center bg-orange-500 h-[40px] leading-[40px] group rt-element',
				classes
			)}
			style={{
				...style,
				// backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${image?.url})`
			}}
			{...buildDataAttributes(dataSet)}
		>
			<div className="px-[10px] whitespace-nowrap text-ellipsis text-start rt-element__content" aria-hidden="true">
			<span style={{
				textShadow: `${style?.backgroundColor as string} -1px -1px 4px,${style?.backgroundColor as string} 1px -1px 4px,${style?.backgroundColor as string} -1px 1px 4px,${style?.backgroundColor as string} 1px 1px 4px,${style?.backgroundColor as string} 0 0 10px`
			}} className="whitespace-nowrap left-[10px] z-10 text-base md:text-lg font-bold sticky">{title}</span>
			</div>
			<div
				className="absolute right-0 top-0 bottom-0 w-[30%] max-w-[20%] overflow-hidden rounded-r-[13px] timeline_cell__image"

			>
				{image && (
					<ImageWithDomain className="object-cover scale-150 w-full h-full" src={image?.url} width={image?.width} height={image?.height} alt={image?.name} />
				)}
			</div>
		</div>
	)
}

{/*<div className={clsx(*/}
{/*	"timeline_tooltip rt-element__tooltip",*/}
{/*	"group-hover:transition-transform group-hover:-translate-x-1/2 group-hover:scale-100",*/}
{/*	"group-focus:transition-transform group-focus:-translate-x-1/2 group-focus:scale-100"*/}
{/*)}>*/}
{/*	{tooltip ? (*/}
{/*		// eslint-disable-next-line react/no-danger*/}
{/*		<div dangerouslySetInnerHTML={{ __html: tooltip.split('\n').join('<br>') }} />*/}
{/*	) : (*/}
{/*		<div>*/}
{/*			<div>{title}</div>*/}
{/*			<div>*/}
{/*				<strong>Start</strong> {getDayMonth(start)}*/}
{/*			</div>*/}
{/*			<div>*/}
{/*				<strong>End</strong> {getDayMonth(end)}*/}
{/*			</div>*/}
{/*		</div>*/}
{/*	)}*/}
{/*</div>*/}

// Basic.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	start: PropTypes.instanceOf(Date).isRequired,
// 	end: PropTypes.instanceOf(Date).isRequired,
// 	style: PropTypes.shape({}),
// 	classes: PropTypes.arrayOf(PropTypes.string.isRequired),
// 	dataSet: PropTypes.shape({}),
// 	tooltip: PropTypes.string,
// }

// export default Basic
