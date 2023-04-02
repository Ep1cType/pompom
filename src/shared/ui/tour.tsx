import React, { useEffect, useRef, useState } from 'react';
import { SingleEliminationMatch } from 'entities/match/model';
import { useWindowSize } from 'shared/hooks/useWindowSize';
import {
	$testGrid,
	$tournamentGrid,
	calcFirstFx,
	calculateTournamentGridFx, editFx,
} from 'entities/tournament/model';
import { useStore } from 'effector-react';
import clsx from 'clsx';
import { Router } from 'next/router';

// const mathes: SingleEliminationMatch[] = [
// 	{
// 		'id': 260005,
// 		'name': 'Grand',
// 		'nextMatchId': 2640464, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
// 		'tournamentRoundText': '4', // Text for Round Header
// 		'startTime': '2021-05-30',
// 		'state': 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
// 		'participants': [
// 			{
// 				'id': 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc', // Unique identifier of any kind
// 				'resultText': '5', // Any string works
// 				'isWinner': false,
// 				'status': null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
// 				'name': 'Олег',
// 			},
// 			{
// 				'id': '9ea9ce1a-4794-4553-856c-9a3620c0531b',
// 				'resultText': 7,
// 				'isWinner': true,
// 				'status': null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
// 				'name': 'Денис',
// 			},
// 		],
// 	},
// 	{
// 		'id': 260464,
// 		'name': 'Grand',
// 		'nextMatchId': 2640464, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
// 		'tournamentRoundText': '4', // Text for Round Header
// 		'startTime': '2021-05-30',
// 		'state': 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
// 		'participants': [
// 			{
// 				'id': 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc', // Unique identifier of any kind
// 				'resultText': 'WON', // Any string works
// 				'isWinner': false,
// 				'status': null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
// 				'name': 'giacomo123',
// 			},
// 			{
// 				'id': '9ea9ce1a-4794-4553-856c-9a3620c0531b',
// 				'resultText': null,
// 				'isWinner': false,
// 				'status': null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
// 				'name': 'Ant',
// 			},
// 		],
// 	},
// 	{
// 		'id': 2640464,
// 		'name': 'Final - Match',
// 		'nextMatchId': null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
// 		'tournamentRoundText': '4', // Text for Round Header
// 		'startTime': '2021-05-30',
// 		'state': 'NO_SHOW', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
// 		'participants': [
// 			{
// 				'id': 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc', // Unique identifier of any kind
// 				'resultText': 'WON', // Any string works
// 				'isWinner': false,
// 				'status': null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
// 				'name': 'giacomo123',
// 			},
// 		],
// 	},
// ];

function getNextMatch(id: number) {
	switch (id) {
		case 1:
			return 9;
		case 2:
			return 9;
		case 3:
			return 10;
		case 4:
			return 10;
		case 5:
			return 11;
		case 6:
			return 11;
		case 7:
			return 12;
		case 8:
			return 12;
		case 9:
			return 13;
		case 10:
			return 13;
		case 11:
			return 14;
		case 12:
			return 14;
		case 13:
			return 15;
		case 14:
			return 15;
		case 15:
			return null;
	}
}


const testMatch = [...new Array(15)].map((el, index): SingleEliminationMatch => {
	const id = index + 1;
	return {
		id,
		name: `random ${id}`,
		nextMatchId: getNextMatch(id),
		tournamentRoundText: '',
		state: 'NO_SHOW',
		startTime: '',
		participants: [
			{
				'id': 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc', // Unique identifier of any kind
				'resultText': '5', // Any string works
				'isWinner': false,
				'status': null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
				'name': 'Олег',
			},
			{
				'id': 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc', // Unique identifier of any kind
				'resultText': '5', // Any string works
				'isWinner': false,
				'status': null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
				'name': 'Олег',
			},
		],
	};
});

const Tour = () => {
	const size = useWindowSize();
	// const finalWidth = Math.max(size.width - 50, 500);
	// const finalHeight = Math.max(size.height - 100, 500);
	const testGrid = useStore($testGrid);

	const grid = useStore($tournamentGrid);

	useEffect(() => {
		calculateTournamentGridFx(['Denis', 'Oleg', 'Evgeniy', 'Danil', 'Slava', 'Valya', 'Ilia', 'Dima', 'Muha', 'Kirill']);
		calcFirstFx(['Denis', 'Oleg', 'Evgeniy', 'Danil', 'Slava', 'Valya', 'Ilia', 'Dima', 'Muha', 'Kirill', "ALL", "KEK", "DDD"]);
	}, []);


	return (
		<>
			{/*<SingleEliminationBracket*/}
			{/*	matchComponent={Match}*/}
			{/*	matches={testMatch}*/}
			{/*	svgWrapper={({ children, ...props }) => (*/}
			{/*		<SVGViewer width={finalWidth} height={500} {...props}>*/}
			{/*			{children}*/}
			{/*		</SVGViewer>*/}
			{/*	)}*/}
			{/*/>*/}
			<div className='flex'>
				<div className='flex gap-10 pb-20'>
					{testGrid.map((el, index) => (
						<div
							key={index}
							className={clsx('flex flex-col flex-col-reverse', index !== 0 ? 'justify-around' : 'gap-5')}
						>
							{el.map((item, ind) => (
								<Cell key={ind} item={item} index={index} />
							))}
						</div>
					))}
				</div>
			</div>
			<div id='bracket-container' className='mb3r' style={{ position: 'relative', width: '940px', height: '595px' }}>
				<svg style={{ position: 'absolute', width: '940px', height: '595px' }}>
					<line id='direction' x1='1' y1='1' x2='100' y2='100' strokeWidth='2' stroke='red'
								style={{ zIndex: 10 }}></line>
				</svg>
				<div className='match x2 stageQF ' style={{ top: '70px', left: '230px' }} id='match9' data-win='a13'
						 data-los='p5'
						 data-state='none'>
					<mark>#9</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa'></td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb'></td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<i className='f80 c'>Место 5-8</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '525px', left: '30px' }} id='match8' data-win='b12'
						 data-los='p9'
						 data-state='ready'>
					<mark>#8</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 15</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 2</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>15</ins>
					<ins className='wbf'>2</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '455px', left: '30px' }} id='match7' data-win='a12'
						 data-los='p9'
						 data-state='ready'>
					<mark>#7</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 7</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 10</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>7</ins>
					<ins className='wbf'>10</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '385px', left: '30px' }} id='match6' data-win='b11'
						 data-los='p9'
						 data-state='ready'>
					<mark>#6</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 11</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 6</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>11</ins>
					<ins className='wbf'>6</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '315px', left: '30px' }} id='match5' data-win='a11'
						 data-los='p9'
						 data-state='ready'>
					<mark>#5</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 3</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 14</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>3</ins>
					<ins className='wbf'>14</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '245px', left: '30px' }} id='match4' data-win='b10'
						 data-los='p9'
						 data-state='ready'>
					<mark>#4</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 13</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 4</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>13</ins>
					<ins className='wbf'>4</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '175px', left: '30px' }} id='match3' data-win='a10'
						 data-los='p9'
						 data-state='ready'>
					<mark>#3</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 5</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 12</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>5</ins>
					<ins className='wbf'>12</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '105px', left: '30px' }} id='match2' data-win='b9'
						 data-los='p9'
						 data-state='ready'>
					<mark>#2</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 9</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 8</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>9</ins>
					<ins className='wbf'>8</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x1 stageR1 _pa_pb' style={{ top: '35px', left: '30px' }} id='match1' data-win='a9'
						 data-los='p9'
						 data-state='ready'>
					<mark>#1</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa comeIn'>Игрок 1</td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb comeIn'>Игрок 16</td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<ins className='waf'>1</ins>
					<ins className='wbf'>16</ins>
					<i className='f80 c'>Место 9-16</i>
				</div>
				<div className='match x2 stageQF ' style={{ top: '210px', left: '230px' }} id='match10' data-win='b13'
						 data-los='p5'
						 data-state='none'>
					<mark>#10</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa'></td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb'></td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<i className='f80 c'>Место 5-8</i>
				</div>
				<div className='match x2 stageQF ' style={{ top: '350px', left: '230px' }} id='match11' data-win='a14'
						 data-los='p5'
						 data-state='none'>
					<mark>#11</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa'></td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb'></td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<i className='f80 c'>Место 5-8</i>
				</div>
				<div className='match x2 stageQF ' style={{ top: '490px', left: '230px' }} id='match12' data-win='b14'
						 data-los='p5'
						 data-state='none'>
					<mark>#12</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa'></td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb'></td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<i className='f80 c'>Место 5-8</i>
				</div>
				<div className='match x3 stageSF ' style={{ top: '140px', left: '430px' }} id='match13' data-win='a15'
						 data-los='p3'
						 data-state='none'>
					<mark>#13</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa'></td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb'></td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<i className='f80 c'>Полуфинал</i>
				</div>
				<div className='match x3 stageSF ' style={{ top: '420px', left: '430px' }} id='match14' data-win='b15'
						 data-los='p3'
						 data-state='none'>
					<mark>#14</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa'></td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb'></td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<i className='f80 c'>Полуфинал</i>
				</div>
				<div className='match x4 stageF ' style={{ top: '280px', left: '630px' }} id='match15' data-win='p1'
						 data-los='p2'
						 data-state='none'>
					<mark>#15</mark>
					<table>
						<tbody>
						<tr>
							<td className='pa'></td>
							<td className='sa'></td>
						</tr>
						<tr>
							<td className='pb'></td>
							<td className='sb'></td>
						</tr>
						</tbody>
					</table>
					<i className='f80 c'>Финал</i>
				</div>
				<div className='draw draw3' style={{ left: '9px', top: '64px', width: '199px', height: '69px' }}></div>
				<div className='draw draw3' style={{ left: '9px', top: '484px', width: '199px', height: '69px' }}></div>
				<div className='draw draw3' style={{ left: '9px', top: '204px', width: '199px', height: '69px' }}></div>
				<div className='draw draw3' style={{ left: '9px', top: '344px', width: '199px', height: '69px' }}></div>
				<div className='draw draw3' style={{ left: '209px', top: '99px', width: '199px', height: '139px' }}></div>
				<div className='draw draw3' style={{ left: '209px', top: '379px', width: '199px', height: '139px' }}></div>
				<div className='draw draw3' style={{ left: '409px', top: '169px', width: '199px', height: '279px' }}></div>
				<div className='stages'>
					<ins className='stage' style={{ left: '227px' }}>1/4 финала</ins>
					<ins className='stage' style={{ left: '27px' }}>Первый тур</ins>
					<ins className='stage' style={{ left: '227px' }}>1/4 финала</ins>
					<ins className='stage' style={{ left: '427px' }}>Полуфинал</ins>
					<ins className='stage' style={{ left: '627px' }}>Финал</ins>
				</div>


			</div>
		</>
	);
};


type It = { id: number, winMatch: number | null, loseMatch: null, start?: number[] | string[] | undefined }
const Cell = ({ item, index }: { item: It, index: number }) => {
	const parent = useRef<HTMLDivElement>(null);
	const [value1, setValue1] = useState('');
	const [value2, setValue2] = useState('');

	// useEffect(() => {
	// 	const observer = new MutationObserver(mutations => {
	// 		console.log(mutations);
	// 	});
	// 	if (parent.current) {
	// 		observer.observe(parent.current, {
	// 			attributes: true,
	// 			attributeOldValue: true,
	// 			characterDataOldValue: true,
	// 			characterData: true,
	// 			subtree: true,
	// 			childList: true,
	// 		});
	// 	}
	// }, []);

	// useEffect(() => {
	// 	const div = document.getElementById(`match${String(item.id + 1)}`);
	// 	const observer = new MutationObserver((mutations) => {
	// 		debugger;
	// 		mutations.forEach((mutation) => {
	// 			debugger;
	// 			const value1 = mutation.target.id === 'player 1' ? mutation.target.nodeValue : 0;
	// 			const value2 = mutation.target.id === 'player 2' ? mutation.target.nodeValue : 0;
	// 			console.log(value1, value2);
	// 			if (value1 > value2 || value2 > value1) {
	// 				console.log(mutation.target.style);
	// 			}
	// 		});
	// 	});
	// 	observer.observe(div, {
	// 		childList: true,
	// 		subtree: true,
	// 		characterDataOldValue: true,
	// 		characterData: true,
	// 		attributeOldValue: true,
	// 	});
	//
	// 	return () => {
	// 		observer.disconnect();
	// 	};
	//
	// }, [item.id, parent.current]);



	return (
		// <div ref={parent} id={`match${String(item.id + 1)}`} className=''>
		// 	#{item.id + 1}
		// 	<div className='w-[150px] h-[37px] border border-black'>
		// 		{item?.player?.map((play, ind) => (
		// 			<div key={ind} className='flex justify-between text-xs'>
		// 				<p contentEditable suppressContentEditableWarning className=''>{typeof play !== 'number' ? play : 'X'}</p>
		// 				<p id={`player ${String(ind + 1)}`} contentEditable suppressContentEditableWarning
		// 					 className='h-[15px] w-[20px] outline-0 rounded-none' />
		// 			</div>
		// 		))}
		// 	</div>
		// </div>

		<div ref={parent} id={`match${String(item.id + 1)}`} className=''>
			#{item.id + 1}
			<div className='w-[150px] h-[37px] border border-black'>
				{item.start && item?.start?.map((play: any, ind) => (
					<div key={ind} className='flex justify-between text-xs'>
						<p contentEditable suppressContentEditableWarning className=''>{typeof play.name !== 'number' ? play.name : 'X'}</p>
						<input type={"number"} id={`player ${String(ind + 1)}`}
									 value={play.count}
									 onChange={event => editFx({
										 value: Number(event.target.value),
										 player: play,
										 // @ts-ignore
										 match: item,
										 index: index
									 })}
							 className='h-[15px] w-[30px] outline-0 rounded-none' />
					</div>
				))}
			</div>
		</div>
	);
};

export default Tour;