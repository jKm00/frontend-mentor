import type { User, Comment, Reply } from '$lib/types';
import user from './data.json';
import { getNextId } from './utils';

function findAll() {
	return user.comments;
}

/**
 * Adds a comment
 * @param content of the comment to add
 * @param author the user adding the comment
 * @returns updated list of comments
 */
function add(content: string, author: User) {
	const id = getNextId();

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

/**
 * Returns the comment/reply of the id provided
 * @param id
 */
function find(id: number) {
	let found: Comment | Reply | null = null;
	let i = 0;
	while (found === null && i < user.comments.length) {
		let j = 0;
		const currentComment = user.comments[i];

		if (currentComment.id === id) {
			found = currentComment;
		}

		while (found === null && j < currentComment.replies.length) {
			const currentReply = currentComment.replies[j];

			if (currentReply.id === id) {
				found = currentReply;
			}

			j++;
		}
		i++;
	}
}

export const comment = {
	findAll,
	add,
	deleteComment
};
