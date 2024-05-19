import { findAll, incrementScore } from '$lib/server/comments';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	function fetchComments() {
		return findAll();
	}

	return {
		comments: fetchComments()
	};
};

export const actions = {
	like: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		if (!id) {
			return fail(404, {
				message: 'Comment not found'
			});
		}

		incrementScore(Number(id));

		return { success: true };
	}
};
