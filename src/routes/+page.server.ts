import { comment } from '$lib/server/comments';
import { reply } from '$lib/server/reply';
import type { User } from '$lib/types';
import type { Actions } from './$types';
import { redirect } from 'sveltekit-flash-message/server';

export const load = async () => {
	function fetchComments() {
		return comment.findAll();
	}

	return {
		comments: fetchComments()
	};
};

export const actions: Actions = {
	addComment: async (event) => {
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

			return { status: 201, message: 'Comment posted!', data: allComments };
		} catch (err) {
			redirect('/', { type: 'error', message: 'Author not available, please try again!' }, event);
		}
	},
	deleteComment: async (event) => {
		const user = event.cookies.get('user');

		if (!user) {
			redirect(301, '/login');
		}

		const form = await event.request.formData();
		const id = form.get('id') as string;

		if (!id) {
			redirect(
				'/',
				{ type: 'error', message: 'Comment id not provided, please try again!' },
				event
			);
		}

		if (!user) {
			redirect('/', { type: 'error', message: 'Author id not provided, please try again!' }, event);
		}

		try {
			const updatedComments = comment.deleteComment(Number(id), user);

			return { status: 200, message: 'Comment deleted!', data: updatedComments };
		} catch (err) {
			if (err instanceof Error) {
				redirect('/', { type: 'error', message: err.message }, event);
			} else {
				redirect('/', { type: 'error', message: 'Something went wrong, please try again!' }, event);
			}
		}
	},
	deleteReply: async (event) => {
		const user = event.cookies.get('user');

		if (!user) {
			redirect(301, '/login');
		}

		const form = await event.request.formData();
		const commentId = form.get('commentId') as string;
		const replyId = form.get('replyId') as string;

		if (!commentId || !replyId || !user) {
			redirect(
				'/',
				{ type: 'error', message: 'Reply data not available, please try again!' },
				event
			);
		}

		try {
			const updatedComments = reply.deleteReply(Number(replyId), Number(commentId), user);

			return { status: 200, message: 'Reply deleted!', data: updatedComments };
		} catch (err) {
			if (err instanceof Error) {
				redirect('/', { type: 'error', message: err.message }, event);
			} else {
				redirect('/', { type: 'error', message: 'Something went wrong, please try again!' }, event);
			}
		}
	}
};
