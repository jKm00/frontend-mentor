import { writable } from 'svelte/store';
import type { User } from './types';

const PROFILE_PICTURES = ['juliusomo', 'amyrobson', 'maxblagun', 'ramsesmiron'];

function initAuth() {
	const authStore = writable<User | null>(null);

	function set(username: string | null) {
		if (username === null) {
			authStore.set(null);
		} else {
			const ppIndex = username?.length % PROFILE_PICTURES.length;

			authStore.set({
				image: {
					png: `./images/avatars/image-${PROFILE_PICTURES[ppIndex]}.png`,
					webp: `./images/avatars/image-${PROFILE_PICTURES[ppIndex]}.webp`
				},
				username
			});
		}
	}

	return {
		subscribe: authStore.subscribe,
		set
	};
}

export const auth = initAuth();
