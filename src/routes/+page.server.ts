import { getUserObject } from '$lib/helpers';
import { comment } from '$lib/server/comments';
import { reply } from '$lib/server/reply';
import { safeExecute } from '$lib/server/utils';
import type { Comment, User } from '$lib/types';
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
		const user = event.cookies.get('user');

		if (!user) {
			redirect(301, '/login');
		}

		const userObj = getUserObject(user);

		const form = await event.request.formData();
		const content = form.get('content') as string;

		if (!content || content === '') {
			redirect('/', { type: 'error', message: 'Need to provide a comment!' }, event);
		}

		return safeExecute(
			{
				action: comment.add,
				event
			},
			content,
			userObj
		);
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

		return safeExecute(
			{
				action: comment.deleteComment,
				event
			},
			Number(id),
			user
		);
	},
	updateComment: async (event) => {
		const user = event.cookies.get('user');

		if (!user) {
			redirect(301, '/login');
		}

		const form = await event.request.formData();
		const id = form.get('id') as string;
		const content = form.get('content') as string;

		if (!id || !content) {
			redirect(
				'/',
				{ type: 'error', message: 'Could not update comment... Please try again later' },
				event
			);
		}

		return safeExecute(
			{
				action: comment.updateComment,
				event
			},
			Number(id),
			content,
			user
		);
	},
	addReply: async (event) => {
		const user = event.cookies.get('user');

		if (!user) {
			redirect(301, '/login');
		}

		const userObj = getUserObject(user);

		const form = await event.request.formData();
		const commentId = form.get('commentId') as string;
		const replyingTo = form.get('replyingTo') as string;
		const content = form.get('content') as string;

		if (!commentId || !replyingTo || !content) {
			redirect(
				'/',
				{ type: 'error', message: 'Could not post reply... Please try again later' },
				event
			);
		}

		return safeExecute(
			{
				action: reply.addReply,
				event
			},
			Number(commentId),
			replyingTo,
			content,
			userObj
		);
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

		return safeExecute(
			{
				action: reply.deleteReply,
				event
			},
			Number(replyId),
			Number(commentId),
			user
		);
	},
	updateReply: async (event) => {
		const user = event.cookies.get('user');

		if (!user) {
			redirect(301, '/login');
		}

		const form = await event.request.formData();
		const commentId = form.get('commentId') as string;
		const replyId = form.get('replyId') as string;
		const content = form.get('content') as string;

		if (!commentId || !replyId || !content) {
			redirect(
				'/',
				{ type: 'error', message: 'Could not update reply... Please try again later' },
				event
			);
		}

		return safeExecute(
			{
				action: reply.updateReply,
				event
			},
			Number(commentId),
			Number(replyId),
			content,
			user
		);
	},
	incrementScore: async (event) => {
		const form = await event.request.formData();
		const commentId = form.get('commentId') as string;
		const replyId = form.get('replyId') as string;

		if (!commentId) {
			redirect(
				'/',
				{ type: 'error', message: 'Could not increment score... Please try again later' },
				event
			);
		}

		if (!replyId) {
			return safeExecute(
				{
					action: comment.incrementScore,
					event
				},
				Number(commentId)
			);
		} else {
			return safeExecute(
				{
					action: reply.incrementScore,
					event
				},
				Number(commentId),
				Number(replyId)
			);
		}
	},
	decrementScore: async (event) => {
		const form = await event.request.formData();
		const commentId = form.get('commentId') as string;
		const replyId = form.get('replyId') as string;

		if (!commentId) {
			redirect(
				'/',
				{ type: 'error', message: 'Could not increment score... Please try again later' },
				event
			);
		}

		if (!replyId) {
			return safeExecute(
				{
					action: comment.decrementScore,
					event
				},
				Number(commentId)
			);
		} else {
			return safeExecute(
				{
					action: reply.decrementScore,
					event
				},
				Number(commentId),
				Number(replyId)
			);
		}
	}
};
