import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ResponseDataItem } from 'shared/api/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { EventApi } from 'shared/api/event';
import { EventItem } from 'shared/api/event/type';

const TimeLine = dynamic(() => import('shared/lib/react-timelines').then(res => res.TimeLine), {
	ssr: false,
});


const START_YEAR = 2023;
// const NUM_OF_YEARS = 1;
const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
// const QUARTERS_PER_YEAR = 4
// const QUARTERS_PER_YEAR = 2;
// const MONTHS_PER_QUARTER = 3;

// const MONTHS_PER_YEAR = 12
// const MONTHS_PER_YEAR = 6;
// const NUM_OF_MONTHS = NUM_OF_YEARS * MONTHS_PER_YEAR;
// const MAX_TRACK_START_GAP = 4;
// const MAX_ELEMENT_GAP = 8;
// const MAX_MONTH_SPAN = 8;
// const MIN_MONTH_SPAN = 2;
// const NUM_OF_TRACKS = 5;
// const MAX_NUM_OF_SUBTRACKS = 5;

const MIN_ZOOM = 2;
const MAX_ZOOM = 50;

// const buildQuarterCells = () => {
// 	const v = [];
// 	for (let i = 0; i < QUARTERS_PER_YEAR * NUM_OF_YEARS; i += 1) {
// 		const quarter = (i % 4) + 1;
// 		const startMonth = i * MONTHS_PER_QUARTER;
// 		const s = addMonthsToYear(START_YEAR, startMonth);
// 		const e = addMonthsToYear(START_YEAR, startMonth + MONTHS_PER_QUARTER);
// 		v.push({
// 			id: `${s.year}-q${quarter}`,
// 			title: `Q${quarter} ${s.year}`,
// 			start: new Date(`${s.year}-${s.month}-01`),
// 			end: new Date(`${e.year}-${e.month}-01`),
// 		});
// 	}
// 	return v;
// };

// const buildMonthCells = () => {
// 	const v = [];
// 	for (let i = 0; i < MONTHS_PER_YEAR * NUM_OF_YEARS; i += 1) {
// 		const startMonthDate = new Date(START_YEAR, i);
// 		const endMonthDate = getMonthDate(START_YEAR, i + 1);
// 		const startMonth = i;
// 		const start = addMonthsToYearAsDate(START_YEAR, startMonth);
// 		const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1);
// 		v.push({
// 			id: `m${startMonth}`,
// 			title: MONTH_NAMES[i % 12],
// 			start: startMonthDate,
// 			end: endMonthDate,
// 		});
// 	}
// 	return v;
// };

// function daysInMonth(month: number, year: number) {
// 	// return new Date(year, month, 0).getDate();
// 	return new Date(year, month, 0).getDate();
// }
//
// function getFullDateOfDay(year: number, month: number, day: number) {
// 	return new Date(year, month, day, 0);
// }

function getMonthDate(year: number, month: number) {
	return new Date(year, month);
}

// const buildMonthDaysCells = () => {
// 	const v = [];
//
//
// 	for (let i = 1; i <= MONTHS_PER_YEAR; i++) {
// 		const days = daysInMonth(i, START_YEAR);
// 		// console.log('DAYS IN MONTH', days);
// 		// const v = [];
//
// 		for (let j = 1; j <= days; j++) {
// 			const startDay = getFullDateOfDay(START_YEAR, i - 1, j);
// 			const endDay = getFullDateOfDay(START_YEAR, i - 1, j + 1);
// 			v.push({
// 				id: `d${j}${i}`,
// 				title: j,
// 				start: startDay,
// 				end: endDay,
// 			});
// 		}
//
// 		// aa.push({
// 		// 	i: v
// 		// })
// 	}
// 	// console.log('VVVVV', v);
// 	return v;
// };

// buildMonthDaysCells();

// const buildTimebar = () => [
// 	// {
// 	// 	id: 'quarters',
// 	// 	title: 'Quarters',
// 	// 	cells: buildQuarterCells(),
// 	// 	style: {},
// 	// },
// 	{
// 		id: 'months',
// 		title: 'Months',
// 		cells: buildMonthCells(),
// 		useAsGrid: false,
// 		style: {},
// 	},
// 	{
// 		id: 'days',
// 		title: 'Days',
// 		cells: buildMonthDaysCells(),
// 		useAsGrid: true,
// 		style: {},
// 	},
// ];

// const buildElement = ({ trackId, start, end, i }) => {
// 	const bgColor = nextColor();
// 	const color = colourIsLight(...hexToRgb(bgColor)) ? '#000000' : '#ffffff';
//
// 	const startD = getMonthDate(START_YEAR, 1);
// 	const endD = getMonthDate(START_YEAR, 4);
//
// 	return {
// 		id: `t-${trackId}-el-${i}`,
// 		title: randomTitle(),
// 		start: startD,
// 		end: endD,
// 		style: {
// 			backgroundColor: `#${bgColor}`,
// 			color,
// 			borderRadius: '4px',
// 			boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
// 			textTransform: 'capitalize',
// 		},
// 	};
// };

// const buildTrackStartGap = () => Math.floor(Math.random() * MAX_TRACK_START_GAP);
// const buildElementGap = () => Math.floor(Math.random() * MAX_ELEMENT_GAP);

// const buildElements = trackId => {
// 	const v = [];
// 	let i = 1;
// 	let month = buildTrackStartGap();
//
// 	while (month < NUM_OF_MONTHS) {
// 		let monthSpan = Math.floor(Math.random() * (MAX_MONTH_SPAN - (MIN_MONTH_SPAN - 1))) + MIN_MONTH_SPAN;
//
// 		if (month + monthSpan > NUM_OF_MONTHS) {
// 			monthSpan = NUM_OF_MONTHS - month;
// 		}
//
// 		const start = addMonthsToYearAsDate(START_YEAR, month);
// 		const end = addMonthsToYearAsDate(START_YEAR, month + monthSpan);
// 		v.push(
// 			buildElement({
// 				trackId,
// 				start,
// 				end,
// 				i,
// 			}),
// 		);
// 		const gap = buildElementGap();
// 		month += monthSpan + gap;
// 		i += 1;
// 	}
//
// 	return v;
// };

// const buildSubtrack = (trackId, subtrackId) => ({
// 	id: `track-${trackId}-${subtrackId}`,
// 	title: `Subtrack ${subtrackId}`,
// 	elements: buildElements(subtrackId),
// });

// const buildTrack = trackId => {
// 	// const tracks = fill(Math.floor(Math.random() * MAX_NUM_OF_SUBTRACKS) + 1).map(i => buildSubtrack(trackId, i + 1));
// 	return {
// 		id: `track-${trackId}`,
// 		title: `Track ${trackId}`,
// 		elements: buildElements(trackId),
// 		// tracks,
// 		// hasButton: true,
// 		// link: 'www.google.com',
// 		isOpen: false,
// 	};
// };

/* eslint-disable no-bitwise */

// const fill = n => {
// 	const arr = [];
// 	for (let i = 0; i < n; i += 1) {
// 		arr.push(i);
// 	}
// 	return arr;
// };

// const COLORS = ['FF005D', '0085B6', '0BB4C1', '00D49D', 'FEDF03', '233D4D', 'FE7F2D', 'FCCA46', 'A1C181', '579C87'];

// const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// let color = -1;
// const nextColor = () => {
// 	color = (color + 1) % COLORS.length;
// 	return COLORS[color];
// };

// let prevColor = null
// export const nextRandomColor = () => {
//   let c = randomColor()
//   while (c === prevColor) {
//     c = randomColor()
//   }
//   prevColor = c
//   return c
// }

// export const randomColor = () => {
//   const LETTERS = '0123456789ABCDEF'
//   let color = ''
//   for (let i = 0; i < 6; i += 1) {
//     color += LETTERS[Math.floor(Math.random() * 16)]
//   }
//   return color
// }

// const hexToRgb = hex => {
// 	const v = parseInt(hex, 16);
// 	const r = (v >> 16) & 255;
// 	const g = (v >> 8) & 255;
// 	const b = v & 255;
// 	return [r, g, b];
// };

// const colourIsLight = (r, g, b) => {
// 	const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
// 	return a < 0.5;
// };

// const addMonthsToYear = (year, monthsToAdd) => {
// 	let y = year;
// 	let m = monthsToAdd;
// 	while (m >= MONTHS_PER_YEAR) {
// 		m -= MONTHS_PER_YEAR;
// 		y += 1;
// 	}
// 	return { year: y, month: m + 1 };
// };

// const addMonthsToYearAsDate = (year, monthsToAdd) => {
// 	const r = addMonthsToYear(year, monthsToAdd);
// 	return new Date(`${r.year}-${r.month}`);
// };

// Credit: https://jsfiddle.net/katowulf/3gtDf/
// const ADJECTIVES = [
// 	'adamant',
// 	'adroit',
// 	'amatory',
// 	'animistic',
// 	'antic',
// 	'arcadian',
// 	'baleful',
// 	'bellicose',
// 	'bilious',
// 	'boorish',
// 	'calamitous',
// 	'caustic',
// 	'cerulean',
// 	'comely',
// 	'concomitant',
// 	'contumacious',
// 	'corpulent',
// 	'crapulous',
// 	'defamatory',
// 	'didactic',
// 	'dilatory',
// 	'dowdy',
// 	'efficacious',
// 	'effulgent',
// 	'egregious',
// 	'endemic',
// 	'equanimous',
// 	'execrable',
// 	'fastidious',
// 	'feckless',
// 	'fecund',
// 	'friable',
// 	'fulsome',
// 	'garrulous',
// 	'guileless',
// 	'gustatory',
// 	'heuristic',
// 	'histrionic',
// 	'hubristic',
// 	'incendiary',
// 	'insidious',
// 	'insolent',
// 	'intransigent',
// 	'inveterate',
// 	'invidious',
// 	'irksome',
// 	'jejune',
// 	'jocular',
// 	'judicious',
// 	'lachrymose',
// 	'limpid',
// 	'loquacious',
// 	'luminous',
// 	'mannered',
// 	'mendacious',
// 	'meretricious',
// 	'minatory',
// 	'mordant',
// 	'munificent',
// 	'nefarious',
// 	'noxious',
// 	'obtuse',
// 	'parsimonious',
// 	'pendulous',
// 	'pernicious',
// 	'pervasive',
// 	'petulant',
// 	'platitudinous',
// 	'precipitate',
// 	'propitious',
// 	'puckish',
// 	'querulous',
// 	'quiescent',
// 	'rebarbative',
// 	'recalcitant',
// 	'redolent',
// 	'rhadamanthine',
// 	'risible',
// 	'ruminative',
// 	'sagacious',
// 	'salubrious',
// 	'sartorial',
// 	'sclerotic',
// 	'serpentine',
// 	'spasmodic',
// 	'strident',
// 	'taciturn',
// 	'tenacious',
// 	'tremulous',
// 	'trenchant',
// 	'turbulent',
// 	'turgid',
// 	'ubiquitous',
// 	'uxorious',
// 	'verdant',
// 	'voluble',
// 	'voracious',
// 	'wheedling',
// 	'withering',
// 	'zealous',
// ];
// const NOUNS = [
// 	'ninja',
// 	'chair',
// 	'pancake',
// 	'statue',
// 	'unicorn',
// 	'rainbows',
// 	'laser',
// 	'senor',
// 	'bunny',
// 	'captain',
// 	'nibblets',
// 	'cupcake',
// 	'carrot',
// 	'gnomes',
// 	'glitter',
// 	'potato',
// 	'salad',
// 	'toejam',
// 	'curtains',
// 	'beets',
// 	'toilet',
// 	'exorcism',
// 	'stick figures',
// 	'mermaid eggs',
// 	'sea barnacles',
// 	'dragons',
// 	'jellybeans',
// 	'snakes',
// 	'dolls',
// 	'bushes',
// 	'cookies',
// 	'apples',
// 	'ice cream',
// 	'ukulele',
// 	'kazoo',
// 	'banjo',
// 	'opera singer',
// 	'circus',
// 	'trampoline',
// 	'carousel',
// 	'carnival',
// 	'locomotive',
// 	'hot air balloon',
// 	'praying mantis',
// 	'animator',
// 	'artisan',
// 	'artist',
// 	'colorist',
// 	'inker',
// 	'coppersmith',
// 	'director',
// 	'designer',
// 	'flatter',
// 	'stylist',
// 	'leadman',
// 	'limner',
// 	'make-up artist',
// 	'model',
// 	'musician',
// 	'penciller',
// 	'producer',
// 	'scenographer',
// 	'set decorator',
// 	'silversmith',
// 	'teacher',
// 	'auto mechanic',
// 	'beader',
// 	'bobbin boy',
// 	'clerk of the chapel',
// 	'filling station attendant',
// 	'foreman',
// 	'maintenance engineering',
// 	'mechanic',
// 	'miller',
// 	'moldmaker',
// 	'panel beater',
// 	'patternmaker',
// 	'plant operator',
// 	'plumber',
// 	'sawfiler',
// 	'shop foreman',
// 	'soaper',
// 	'stationary engineer',
// 	'wheelwright',
// 	'woodworkers',
// ];

// const randomTitle = () =>
// 	`${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`;


const now = new Date();

// const timebar = buildTimebar();

const clickElement = (element: Element) => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);

// const tracksID = fill(NUM_OF_TRACKS).reduce((acc, i) => {
// 	const track = buildTrack(i + 1);
// 	acc[track.id] = track;
// 	return acc;
// }, {});


function createTask(eventList: ResponseDataItem<EventItem>[]) {
	const array = [...new Set(eventList.map((event) => event.attributes.type))]
		.map((item, index) => (
			{
				id: `track-${index + 1}`,
				title: item,
				elements: eventList.filter(s => s.attributes.type === item).map((t, ind) => ({
					id: `t-${index + 1}-el-${ind + 1}`,
					title: t.attributes.name,
					start: new Date(t.attributes.start_date),
					end: new Date(t.attributes.end_date),
					style: {
						backgroundColor: t.attributes.color,
						borderRadius: "13px",
						boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
						color: "#000000",
						textTransform: "capitalize",
					},
					image: t.attributes.image.data?.attributes
				})),
				isOpen: false
			}
		));
	return array;
}


const LinePage = ({ eventList }: InferGetStaticPropsType<typeof getStaticProps>) => {
	console.log('EVENTLIST', eventList);
	const testTracks = createTask(eventList)
	console.log(testTracks)


	const [open, setOpen] = useState(false);
	const [zoom, setZoom] = useState(30);
	const [tracksById, setTracksById] = useState();
	// const [tracks, setTracks] = useState(Object.values(tracksID));
	const [tracks, setTracks] = useState(createTask(eventList));
	console.log("STANDART TRACKS", tracks)
	const handleToggleOpen = () => {
		setOpen(prev => !prev);
	};

	const handleZoomIn = () => {
		setZoom(prev => Math.min(prev + 1, MAX_ZOOM));
	};

	const handleZoomOut = () => {
		setZoom(prev => Math.max(prev - 1, MIN_ZOOM));
	};


	const handleToggleTrackOpen = (track: any) => {
		setTracksById((prev: any) => {
			const newState = {
				...prev,
				[track.id]: {
					...track,
					isOpen: !track.isOpen,
				},
			};
			setTracks(Object.values(newState));

			return newState;
		});
	};


	const currentDate = new Date();

	function subtractMonths(currentDate: Date, month: number) {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() - month);
		newDate.setHours(0, 0, 0, 0);
		return newDate;
	}

	function getFirstDayOfMonth(date: Date) {
		const newDate = new Date(date);
		newDate.setMonth(date.getMonth(), 1);
		newDate.setHours(0, 0, 0, 0);
		return newDate;
	}

	function getLastDayOfMonth(date: Date) {
		const newDate = new Date(date);
		newDate.setMonth(date.getMonth() + 1, 0);
		newDate.setHours(0, 0, 0, 0);
		return newDate;
	}

	function getDatesInRange(startDate: Date, endDate: Date) {
		const date = new Date(startDate.getTime());

		const datesList = [];

		while (date <= endDate) {
			// datesList.push(new Date(date));
			const dateObject = {
				year: new Date(date).getFullYear(),
				month: new Date(date).getMonth(),
			};
			datesList.push(dateObject);
			date.setDate(date.getDate() + 1);
		}

		return datesList.filter((value, index, self) => (
			index === self.findIndex((t) => (
				t.year === value.year && t.month === value.month
			))
		)).map((item) => (
			new Date(item.year, item.month)
		));
	}

	function getDaysInRange(startDate: Date, endDate: Date) {
		const date = new Date(startDate.getTime());
		const datesList = [];

		while (date <= endDate) {
			datesList.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		return datesList;

	}

	function buildMonthsCells(dateRange: Date[]) {
		return dateRange.map((date, index) => (
			{
				id: `m${index}`,
				title: MONTH_NAMES[date.getMonth() % 12],
				start: getFirstDayOfMonth(date),
				end: getMonthDate(date.getFullYear(), date.getMonth() + 1),
			}
		));
	}


	// console.log('currentDate', currentDate); //11 may
	const startDate = subtractMonths(currentDate, 3);
	// console.log('startDate', startDate); //Sat Feb 11
	const endDate = subtractMonths(currentDate, -3);
	// console.log('lastDate', endDate); //Fri Aug 11
	const firstDayOfMonth = getFirstDayOfMonth(subtractMonths(currentDate, 3));
	const lastDayOfMonth = getLastDayOfMonth(subtractMonths(currentDate, -3));
	// console.log('firstDayOfMonth', firstDayOfMonth);  //Для отрисовки месяцев и дней в Header
	// console.log('lastDayOfMonth', lastDayOfMonth);  //Для отрисовки месяцев и дней в Header
	const dateRange = getDatesInRange(firstDayOfMonth, lastDayOfMonth);
	const daysRange = getDaysInRange(firstDayOfMonth, endDate);
	// console.log('buildMonthCells', buildMonthsCells(dateRange));

	const buildDaysCells = (dateRange: Date[]) => {
		return dateRange.map((item, index) => {
			return {
				id: `d${item.getMonth()}${index}`,
				title: item.getDate(),
				start: item,
				end: new Date(item.getFullYear(), item.getMonth(), item.getDate() + 1, 0),
			};
		});
	};

	// console.log('daysRange', buildDaysCells(daysRange));

	const buildTimebar = () => [
		{
			id: 'months',
			title: 'Months',
			cells: buildMonthsCells(dateRange),
			useAsGrid: false,
			style: {},
		},
		{
			id: 'days',
			title: 'Days',
			cells: buildDaysCells(daysRange),
			useAsGrid: true,
			style: {},
		},
	];

	return (
		<div className='container mx-auto px-4 py-8 md:py-16'>
			<TimeLine
				scale={{
					start: startDate,
					end: endDate,
					zoom,
					zoomMin: MIN_ZOOM,
					zoomMax: MAX_ZOOM,
				}}
				isOpen={open}
				toggleOpen={handleToggleOpen}
				// zoomIn={handleZoomIn}
				// zoomOut={handleZoomOut}
				clickElement={clickElement}
				clickTrackButton={(track: any) => {
					// eslint-disable-next-line no-alert
					alert(JSON.stringify(track))
				}}
				// timebar={timebar}
				timebar={buildTimebar()}
				tracks={tracks}
				// tracks={testTracks}
				now={now}
				toggleTrackOpen={handleToggleTrackOpen as any}
				enableSticky
				scrollToNow

			/>
		</div>
	);
};

export const getStaticProps: GetStaticProps<{ eventList: ResponseDataItem<EventItem>[] }> = async (
	context,
) => {
	const Api = new EventApi();

	const locale = context.locale as string;

	try {
		const response = await Api.getEventsList();

		return {
			props: {
				eventList: response.data.data,
				...(await serverSideTranslations(locale, ['common'])),
			},
			revalidate: 60,
		};

	} catch (e) {
		return {
			props: {
				eventList: [],
				...(await serverSideTranslations(locale, ['common'])),
			},
		};
	}
};

export default LinePage;


