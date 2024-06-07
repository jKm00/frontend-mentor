import type { User } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import { loadFlash } from 'sveltekit-flash-message/server';

const PROTECTED_PATHS = ['/'];

export const load = loadFlash(async (event) => {
	const user = event.cookies.get('user');

	if (!user && PROTECTED_PATHS.includes(event.url.pathname)) {
		redirect(301, '/login');
	}

	return { user };
});
