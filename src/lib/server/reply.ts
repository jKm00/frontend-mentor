import user from './data.json';

/**
 * Deletes a reply
 * @param replyId id of the reply to delete
 * @param commentId id of the comment the reply is replying to
 * @param username of the user trying to delete the reply
 * @return the updated comments list
 */
function deleteReply(replyId: number, commentId: number, username: string) {
	const commentIndex = user.comments.findIndex((c) => c.id === commentId);

	if (!commentIndex) {
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
	deleteReply
};
