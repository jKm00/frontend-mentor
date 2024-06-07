import type { User } from '$lib/types';
import user from './data.json';
import { getNextId } from './utils';

/**
 * Adds a reply to a comment
 * @param commentId of the comment
 * @param replyingTo name of the user this reply is replying to
 * @param content of the reply
 * @param author that created this reply
 * @returns updated comments list
 */
function addReply(commentId: number, replyingTo: string, content: string, author: User) {
	const commentIndex = user.comments.findIndex((c) => c.id === commentId);

	if (commentIndex === -1) {
		throw new Error(`Could not find comment with id: ${commentId}`);
	}

	user.comments[commentIndex].replies.push({
		id: getNextId(),
		content,
		createdAt: new Date().toDateString(),
		score: 1,
		user: author,
		replyingTo
	});

	return user.comments;
}

/**
 * Deletes a reply
 * @param replyId id of the reply to delete
 * @param commentId id of the comment the reply is replying to
 * @param username of the user trying to delete the reply
 * @return the updated comments list
 */
function deleteReply(replyId: number, commentId: number, username: string) {
	const commentIndex = user.comments.findIndex((c) => c.id === commentId);

	if (commentIndex === -1) {
		throw new Error(`Could not find comment with id: ${commentId}`);
	}

	const reply = user.comments[commentIndex].replies.find((r) => r.id === replyId);

	if (!reply) {
		throw new Error(`Could not find reply with id: ${replyId}`);
	}

	if (reply.user.username !== username) {
		throw new Error(
			`You are not the owner of the reply with id (${replyId}) and cannot delete it!`
		);
	}

	const replies = user.comments[commentIndex].replies.filter((r) => r.id !== reply.id);
	user.comments[commentIndex].replies = replies;

	return user.comments;
}

export const reply = {
	addReply,
	deleteReply
};
