import { createEffect } from 'effector/compat';
import { TournamentApi } from 'shared/api/tournament';
import { createStore, sample } from 'effector';
import { ResponseDataItem } from 'shared/api/types';
import { Tournament, TournamentExtend } from 'shared/api/tournament/types';
import { createGate } from 'effector-react';
import players from 'pages/players';

const Api = new TournamentApi();

class Heap<T> {
	private heapArray: T[] = [];

	constructor(elements: T[]) {
		this.buildHeap(elements);
	}

	// Build the heap
	private buildHeap(elements: T[]) {
		for (let i = 0; i < elements.length; i++) {
			this.heapArray.push(elements[i]);
			this.heapifyUp(i);
		}
	}

	// Get the parent index of a node
	private getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}

	// Get the left child index of a node
	private getLeftChildIndex(index: number) {
		return index * 2 + 1;
	}

	// Get the right child index of a node
	private getRightChildIndex(index: number) {
		return index * 2 + 2;
	}

	// Swap two elements in the heap
	private swap(index1: number, index2: number) {
		const temp = this.heapArray[index1];
		this.heapArray[index1] = this.heapArray[index2];
		this.heapArray[index2] = temp;
	}

	// Move a node up the heap to maintain heap property
	private heapifyUp(index: number) {
		let currentIndex = index;
		while (
			currentIndex > 0 &&
			this.heapArray[currentIndex] > this.heapArray[this.getParentIndex(currentIndex)]
			) {
			this.swap(currentIndex, this.getParentIndex(currentIndex));
			currentIndex = this.getParentIndex(currentIndex);
		}
	}

	// Move a node down the heap to maintain heap property
	private heapifyDown(index: number) {
		let currentIndex = index;
		let maxChildIndex = this.getMaxChildIndex(currentIndex);

		while (
			maxChildIndex !== -1 &&
			this.heapArray[currentIndex] < this.heapArray[maxChildIndex]
			) {
			this.swap(currentIndex, maxChildIndex);
			currentIndex = maxChildIndex;
			maxChildIndex = this.getMaxChildIndex(currentIndex);
		}
	}

	// Get the index of the child node with the maximum value
	private getMaxChildIndex(index: number) {
		const leftChildIndex = this.getLeftChildIndex(index);
		const rightChildIndex = this.getRightChildIndex(index);

		if (leftChildIndex >= this.heapArray.length) {
			return -1;
		}

		if (rightChildIndex >= this.heapArray.length) {
			return leftChildIndex;
		}

		return this.heapArray[leftChildIndex] > this.heapArray[rightChildIndex]
			? leftChildIndex
			: rightChildIndex;
	}

	// Add an element to the heap
	add(element: T) {
		this.heapArray.push(element);
		this.heapifyUp(this.heapArray.length - 1);
	}

	// Remove the root element from the heap
	remove() {
		if (this.heapArray.length === 0) {
			return undefined;
		}

		if (this.heapArray.length === 1) {
			return this.heapArray.pop();
		}

		const root = this.heapArray[0];
		this.heapArray[0] = this.heapArray.pop()!;
		this.heapifyDown(0);

		return root;
	}

	// Check if the heap is empty
	isEmpty() {
		return this.heapArray.length === 0;
	}

	// Get the size of the heap
	size() {
		return this.heapArray.length;
	}

	// Get the root element of the heap
	peek() {
		return this.heapArray.length === 0 ? undefined : this.heapArray[0];
	}
}

type Player = {
	name: string;
}

class TournamentClass {
	private players: string[];
	private matches: string[][];

	constructor(players: string[]) {
		this.players = players;
		this.matches = this.generateMatches();
	}

	public createMatches(): [string, string | null][] {
		const shuffledPlayers = this.shuffle(this.players);
		const matches: [string, string | null][] = [];

		for (let i = 0; i < 8; i++) {
			const firstPlayer = shuffledPlayers[i * 2];
			const secondPlayer = shuffledPlayers[i * 2 + 1] || null;
			matches.push([firstPlayer, secondPlayer]);
		}

		return matches;
	}

	private generateMatches(): string[][] {
		const shuffledPlayers = this.shuffle(this.players);
		const numberOfPlayers = shuffledPlayers.length;
		const numberOfRounds = Math.ceil(Math.log2(numberOfPlayers));
		const matches: string[][] = [];

		for (let round = 0; round < numberOfRounds; round++) {
			const roundMatches: string[][] = [];
			const roundPlayers: string[] = [];

			if (round === 0) {
				for (let i = 0; i < numberOfPlayers / 2; i++) {
					const player1 = shuffledPlayers[i];
					const player2 = shuffledPlayers[numberOfPlayers - i - 1];
					roundMatches.push([player1, player2]);
				}
			} else {
				for (let i = 0; i < matches[round - 1].length; i++) {
					roundPlayers.push(matches[round - 1][i][0]);
					roundPlayers.push(matches[round - 1][i][1]);
				}

				if (roundPlayers.length % 2 !== 0) {
					roundPlayers.push('BYE');
				}

				for (let i = 0; i < roundPlayers.length / 2; i++) {
					const player1 = roundPlayers[i];
					const player2 = roundPlayers[roundPlayers.length - i - 1];
					if (player1 !== 'BYE' && player2 !== 'BYE') {
						roundMatches.push([player1, player2]);
					}
				}
			}

			matches.push(roundMatches as any);
		}

		return matches.flat() as any;
	}

	private shuffle(array: string[]): string[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	getMatches(): string[][] {
		return this.matches;
	}
}

function drawHeap(heap: Heap<number>): number[][] {
	const levels = Math.ceil(Math.log2(heap.size() + 1));
	const nodes = heap.size();
	let currentIndex = 0;
	const lines: number[][] = [];

	for (let level = 0; level < levels; level++) {
		const line: number[] = [];

		for (let i = 0; i < Math.pow(2, level) && currentIndex < nodes; i++) {
			const element = heap.peek();

			if (element !== undefined) {
				line.push(element);
				heap.remove();
			}

			currentIndex++;
		}

		lines.push(line);
	}

	return lines;
}


// interface BinaryHeapNode {
// 	value: number;
// 	children: [BinaryHeapNode | null, BinaryHeapNode | null] | null;
// }
//
// class BinaryHeap {
// 	private heap: number[];
//
// 	constructor(size: number) {
// 		this.heap = [];
// 		for (let i = 0; i < size; i++) {
// 			this.add(Math.floor(Math.random() * 100)); // Добавляем случайное число в кучу
// 		}
// 	}
//
// 	private getLeftChildIndex(parentIndex: number): number {
// 		return 2 * parentIndex + 1;
// 	}
//
// 	private getRightChildIndex(parentIndex: number): number {
// 		return 2 * parentIndex + 2;
// 	}
//
// 	private getParentIndex(childIndex: number): number {
// 		return Math.floor((childIndex - 1) / 2);
// 	}
//
// 	private swap(index1: number, index2: number): void {
// 		const temp = this.heap[index1];
// 		this.heap[index1] = this.heap[index2];
// 		this.heap[index2] = temp;
// 	}
//
// 	private siftUp(index: number): void {
// 		const parentIndex = this.getParentIndex(index);
// 		if (this.heap[parentIndex] > this.heap[index]) {
// 			this.swap(parentIndex, index);
// 			this.siftUp(parentIndex);
// 		}
// 	}
//
// 	private siftDown(index: number): void {
// 		const leftChildIndex = this.getLeftChildIndex(index);
// 		const rightChildIndex = this.getRightChildIndex(index);
// 		let minIndex = index;
//
// 		if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[minIndex]) {
// 			minIndex = leftChildIndex;
// 		}
//
// 		if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[minIndex]) {
// 			minIndex = rightChildIndex;
// 		}
//
// 		if (index !== minIndex) {
// 			this.swap(index, minIndex);
// 			this.siftDown(minIndex);
// 		}
// 	}
//
// 	add(value: number): void {
// 		this.heap.push(value);
// 		this.siftUp(this.heap.length - 1);
// 	}
//
// 	remove(): number | undefined {
// 		if (this.heap.length === 0) {
// 			return undefined;
// 		}
// 		if (this.heap.length === 1) {
// 			return this.heap.pop();
// 		}
//
// 		const root = this.heap[0];
// 		this.heap[0] = this.heap.pop()!;
// 		this.siftDown(0);
//
// 		return root;
// 	}
//
// 	getHeap(): BinaryHeapNode {
// 		const rootNode: BinaryHeapNode = {
// 			value: this.heap[0],
// 			children: [null, null],
// 		};
//
// 		const queue: [BinaryHeapNode, number][] = [[rootNode, 0]];
//
// 		while (queue.length > 0) {
// 			const [parentNode, parentIndex] = queue.shift()!;
// 			const leftChildIndex = this.getLeftChildIndex(parentIndex);
// 			const rightChildIndex = this.getRightChildIndex(parentIndex)
//
// 			if (leftChildIndex < this.heap.length) {
// 				const leftChildNode: BinaryHeapNode = {
// 					value: this.heap[leftChildIndex],
// 					children: [null, null],
// 				};
// 				parentNode.children[0] = leftChildNode;
// 				queue.push([leftChildNode, leftChildIndex]);
// 			}
//
// 			if (rightChildIndex < this.heap.length) {
// 				const rightChildNode: BinaryHeapNode = {
// 					value: this.heap[rightChildIndex],
// 					children: [null, null],
// 				};
// 				parentNode.children[1] = rightChildNode;
// 				queue.push([rightChildNode, rightChildIndex]);
// 			}
// 		}
//
// 		return rootNode;
//
// 	}
// }

type BinaryHeapNode = {
	value: number;
	children: [BinaryHeapNode | null, BinaryHeapNode | null] | null;
};

class ReverseBinaryHeap {
	private heap: number[];

	constructor(size: number) {
		this.heap = [];
		for (let i = size; i >= 1; i--) {
			this.insert(i);
		}
	}

	private swap(index1: number, index2: number) {
		[this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
	}

	private siftDown(index: number) {
		let maxIndex = index;
		const leftChildIndex = 2 * index + 1;
		const rightChildIndex = 2 * index + 2;

		if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[maxIndex]) {
			maxIndex = leftChildIndex;
		}

		if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[maxIndex]) {
			maxIndex = rightChildIndex;
		}

		if (maxIndex !== index) {
			this.swap(index, maxIndex);
			this.siftDown(maxIndex);
		}
	}

	private insert(value: number) {
		this.heap.push(value);
		let currentIndex = this.heap.length - 1;
		let parentIndex = Math.floor((currentIndex - 1) / 2);

		while (currentIndex > 0 && this.heap[currentIndex] > this.heap[parentIndex]) {
			this.swap(currentIndex, parentIndex);
			currentIndex = parentIndex;
			parentIndex = Math.floor((currentIndex - 1) / 2);
		}
	}

	public getHeap(): [BinaryHeapNode, number[]] {
		if (this.heap.length === 0) {
			return [{ value: null, children: null }, []] as any;
		}

		const rootNode: BinaryHeapNode = {
			value: this.heap[0],
			children: [null, null],
		};

		const queue: [BinaryHeapNode, number][] = [[rootNode, 0]];
		const reverseHeap: number[] = [];

		while (queue.length > 0) {
			const [parentNode, parentIndex]: any = queue.shift();
			const leftChildIndex = 2 * parentIndex + 2;
			const rightChildIndex = 2 * parentIndex + 1;

			if (rightChildIndex < this.heap.length) {
				const rightChildNode: BinaryHeapNode = {
					value: this.heap[rightChildIndex],
					children: [null, null],
				};
				parentNode.children[0] = rightChildNode;
				queue.push([rightChildNode, rightChildIndex]);
			}

			if (leftChildIndex < this.heap.length) {
				const leftChildNode: BinaryHeapNode = {
					value: this.heap[leftChildIndex],
					children: [null, null],
				};
				parentNode.children[1] = leftChildNode;
				queue.push([leftChildNode, leftChildIndex]);
			}

			reverseHeap.unshift(parentNode.value);
		}

		return [rootNode, reverseHeap];
	}
}


type S16 = { id: number, winMatch: number | null, loseMatch: null, start?: number[] | string[] }[][]


const s16: S16 = [
	[
		{ id: 0, winMatch: 8, loseMatch: null, start: [0, 15] },
		{ id: 1, winMatch: 8, loseMatch: null, start: [8, 7] },
		{ id: 2, winMatch: 9, loseMatch: null, start: [4, 11] },
		{ id: 3, winMatch: 9, loseMatch: null, start: [12, 3] },
		{ id: 4, winMatch: 10, loseMatch: null, start: [2, 13] },
		{ id: 5, winMatch: 10, loseMatch: null, start: [10, 5] },
		{ id: 6, winMatch: 11, loseMatch: null, start: [6, 9] },
		{ id: 7, winMatch: 11, loseMatch: null, start: [14, 1] },
	],
	[
		{ id: 8, winMatch: 12, loseMatch: null },
		{ id: 9, winMatch: 12, loseMatch: null },
		{ id: 10, winMatch: 13, loseMatch: null },
		{ id: 11, winMatch: 13, loseMatch: null },
	],
	[
		{ id: 12, winMatch: 14, loseMatch: null },
		{ id: 13, winMatch: 14, loseMatch: null },
	],
	[
		{ id: 14, winMatch: null, loseMatch: null },
	],
];

function shuffle(array: string[]): string[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}


export const calcFirstFx = createEffect(async (playersList: any[]) => {
	const gridArray = [...s16];

	const shuffledPlayers = shuffle(playersList);

	shuffledPlayers.forEach((player, index) => {
		gridArray.map((item, ind) => {
			return item.map((match, i) => {
				if (match.start) {
					const isIndex = match.start.indexOf(index as never);
					if (isIndex !== -1) {
						return {
							...match,
							start: match.start.splice(isIndex, 1, { name: player, count: 0 } as any),
						};
					}
				}
			});
		});
	});

	gridArray.forEach((item) => {
		item.forEach((el, index) => {
			if (!el.start) {
				el.start = [{ name: null, count: 0 }, { name: null, count: 0 }] as any;
			} else {
				const indexEl = el.start.findIndex(el => typeof el === 'number');
				if (indexEl !== -1) {
					el.start[indexEl] = { name: null, count: 0 } as any;
				}
			}
		});
	});

	const structure = gridArray.map(el => Array.isArray(el) ? el : null);
	const flat = gridArray.flat();

	gridArray.map((item, index) => {
		if (index > 0) return item;
		return item.map((match) => {
			if (!match.start) return
			const firstPlayer = match.start[0] as any;
			const secondPlayer = match.start[1] as any;
			const nextMatchId = match.winMatch;

			if (!firstPlayer.name && secondPlayer.name) {
				flat.forEach((el) => {
					if (el.id === nextMatchId) {
						if (!el.start) return
						el.start[0] = secondPlayer;
					}
				});
			}
			if (!secondPlayer.name && firstPlayer.name) {
				flat.forEach((el) => {
					if (el.id === nextMatchId) {
						if (!el.start) return
						el.start[1] = firstPlayer;
					}
				});
			}

		});
	});
	return gridArray;
});

function revertFlattening(flatArray: any, structure: any) {
	let index = 0;
	return structure.map((element: any) => element ? element.map(() => flatArray[index++]) : flatArray[index++]);
}

interface EditFx {
	match: { id: number, winMatch: number | null, loseMatch: null, start: { name: string | null, count: number }[] };
	player: { name: string | null, count: number };
	value: number;
	index: number;
}

export const editFx = createEffect(async (data: EditFx): Promise<EditFx> => {
	return data;
});


export const $testGrid = createStore<S16>([])
	.on(calcFirstFx.doneData, (state, payload) => payload)
	.on(editFx.doneData, (state, payload) => {
		const newArray = state.map((item) => {
			return item.map((el) => {
				if (el.id === payload.match.id) {
					return {
						...el,
						// @ts-ignore
						start: el.start?.map((pl) => pl.name === payload.player.name ? { ...pl, count: payload.value } : pl),
					};
				} else {
					return el;
				}
			});
		});

		const flat = newArray.flat();
		// @ts-ignore
		const firstPlayer = flat.filter((el) => el.id === payload.match.id)[0].start[0]
		// @ts-ignore
		const secondPlayer = flat.filter((el) => el.id === payload.match.id)[0].start[1]

		const nextMatchId = payload.match.winMatch;

		return newArray.map((item, index) => {
			if (index === payload.index + 1) {
				return item.map((el) => {
					if (el.id === nextMatchId) {

						if (!firstPlayer.name || !secondPlayer.name) return el

						if (firstPlayer.count > secondPlayer.count) {

							if (payload.match.id % 2 === 0) {
								return {
									...el,
									// @ts-ignore
									start: [...el.start.slice(0, 1), {...firstPlayer, count: 0}, ...el.start.slice(2)]
								}
							} else {
								return {
									...el,
									// @ts-ignore
									start: [...el.start.slice(0, 0), {...firstPlayer, count: 0}, ...el.start.slice(1)]
								}
							}
						} else if (secondPlayer.count > firstPlayer.count) {
							if (payload.match.id % 2 === 0) {
								return {
									...el,
									// @ts-ignore
									start: [...el.start.slice(0, 1), {...secondPlayer, count: 0}, ...el.start.slice(2)]
								}
							} else {
								return {
									...el,
									// @ts-ignore
									start: [...el.start.slice(0, 0), {...secondPlayer, count: 0}, ...el.start.slice(1)]
								}
							}
						} else {
							return el
						}

					} else {
						return el
					}
				})
			} else {
				return item
			}
		})

	});

export const calculateTournamentGridFx = createEffect(async (playersList: any[]) => {
	const emptyArr = [...new Array(15)].map((_, index) => index);

	const match = new Heap(emptyArr);
	const heap = drawHeap(match);

	const grid = heap.map((el) => {
		return el.map((item) => ({
			id: item,
		}));
	}).reverse();


	const tournament = new TournamentClass(playersList);
	const grids = tournament.createMatches();
	grid[0] = [
		{ player: [0, 15], id: 7 },
		{ player: [8, 7], id: 6 },
		{ player: [4, 11], id: 5 },
		{ player: [12, 3], id: 4 },
		{ player: [2, 13], id: 3 },
		{ player: [10, 5], id: 2 },
		{ player: [6, 9], id: 1 },
		{ player: [14, 1], id: 0 },
	] as any;

	playersList.map((_, index) => {
		grid[0].map((item, i) => {
			// @ts-ignore
			if (item.player.includes(index)) {
				// @ts-ignore
				const isIndex = item.player.indexOf(index);
				return {
					...item,
					// @ts-ignore
					player: item.player.splice(isIndex, 1, _),
				};
			}
		});
	});

	const heapst = new ReverseBinaryHeap(15);

	return grid;

});


export const $tournamentGrid = createStore<{ id: number }[][]>([])
	.on(calculateTournamentGridFx.doneData, (state, payload) => payload);

export const fetchTournamentsListFx = createEffect(async () => {
	return await Api.getTournamentList();
});

export const fetchTournamentInfo = createEffect(async ({ id }: { id: number }) => {
	return await Api.getTournament(id);
});

export const $tournamentInfo = createStore<ResponseDataItem<TournamentExtend>>({} as ResponseDataItem<TournamentExtend>)
	.on(fetchTournamentInfo.doneData, (_, payload) => payload.data.data);

export const $tournamentsList = createStore<ResponseDataItem<Tournament>[]>([])
	.on(fetchTournamentsListFx.doneData, (_, payload) => payload.data.data);

export const TournamentsListGate = createGate();
export const TournamentGate = createGate<{ id: number }>();

sample({
	clock: TournamentsListGate.open,
	target: fetchTournamentsListFx,
});

sample({
	clock: TournamentGate.state,
	target: fetchTournamentInfo,
});