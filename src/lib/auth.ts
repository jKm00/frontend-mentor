import { writable } from 'svelte/store';
import type { User } from './types';
import { getUserObject } from './helpers';

function initAuth() {
	const authStore = writable<User | null>(null);

	function set(username: string | null) {
		if (username === null) {
			authStore.set(null);
		} else {
			authStore.set(getUserObject(username));
		}
	}

	return {
		subscribe: authStore.subscribe,
		set
	};
}

export const auth = initAuth();
