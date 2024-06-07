import type { User } from '$lib/types';
import user from './data.json';

function findAll() {
	return user.comments;
}

function add(content: string, author: User) {
	const id = Math.max(...user.comments.map((c) => c.id)) + 1;

	const comment = {
		id,
		content,
		createdAt: new Date().toDateString(),
		score: 1,
		user: author,
		replies: []
	};

	user.comments.push(comment);

	return user.comments;
}

/**
 * Deletes a comment
 * @param id of the comment to delete
 * @param username of the user trying to delete the post
 * @returns the updated list of comments
 */
function deleteComment(id: number, username: string) {
	const comment = user.comments.find((c) => c.id === id);

	if (!comment) {
		throw new Error(`Could not find comment with id: ${id}`);
	}

	if (comment.user.username !== username) {
		throw new Error(`You are not the owner of this post and cannot delete it!`);
	}

	const updatedComments = user.comments.filter((c) => c.id !== id);
	user.comments = updatedComments;

	return updatedComments;
}

export const comment = {
	findAll,
	add,
	deleteComment
};
