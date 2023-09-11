import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const createScore = () => {
	const { subscribe, set, update } = writable<number>(0);

	if (browser) {
		const storedScore = window.localStorage.getItem('score');
		set(Number(storedScore) ?? 0);
	}

	subscribe((value) => {
		if (browser) {
			window.localStorage.setItem('score', JSON.stringify(value));
		}
	});

	const incrememt = () => {
		update((value) => {
			return value + 1;
		});
	};

	const decrement = () => {
		update((value) => {
			if (value === 0) return value;
			return value - 1;
		});
	};

	return {
		subscribe,
		incrememt,
		decrement
	};
};

export const score = createScore();
