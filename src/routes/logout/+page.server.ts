import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		event.cookies.delete('user', {
			path: '/'
		});

		redirect(301, '/login');
	}
};
