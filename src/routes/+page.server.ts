import { comment } from '$lib/server/comments';
import { currentUser } from '$lib/server/user';
import type { User } from '$lib/types';
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
		const content = form.get('content') as string;
		const author = form.get('author') as string;

		if (!author) {
			redirect('/', { type: 'error', message: 'Author not available, please try again!' }, event);
		}

		if (!content || content === '') {
			redirect('/', { type: 'error', message: 'Need to provide a comment!' }, event);
		}

		try {
			const authorObj = JSON.parse(author) as User;
			const allComments = comment.add(content, authorObj);

			return { status: 201, data: allComments };
		} catch (err) {
			redirect('/', { type: 'error', message: 'Author not available, please try again!' }, event);
		}
	}
};
