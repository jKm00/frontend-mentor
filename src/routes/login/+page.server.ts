import { dev } from '$app/environment';
import type { Actions } from './$types';
import { redirect } from 'sveltekit-flash-message/server';

export const actions: Actions = {
	login: async (event) => {
		const form = await event.request.formData();
		const username = form.get('username') as string;

		if (!username) {
			redirect('/login', { type: 'error', message: 'Need to provide a username!' }, event);
		}

		event.cookies.set('user', username, {
			path: '/',
			maxAge: 60 * 20, // 20 minutes,
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev
		});

		redirect(301, '/');
	}
};
