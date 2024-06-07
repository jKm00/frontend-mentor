import { comment } from '$lib/server/comments';
import { currentUser } from '$lib/server/user';
import type { Actions } from './$types';
import { redirect } from 'sveltekit-flash-message/server';

export const load = async () => {
	function fetchComments() {
		return comment.findAll();
	}

	function fetchUser() {
		return currentUser.get();
	}

	return {
		currentUser: fetchUser(),
		comments: fetchComments()
	};
};

export const actions: Actions = {
	add: async (event) => {
		const form = await event.request.formData();
		const comment = form.get('comment');

		if (!comment || comment === '') {
			redirect('/', { type: 'error', message: 'No comment provided' }, event);
		}

		return { status: 201, message: 'Comment posted' };
	}
};
