import type { User, Comment, Reply } from '$lib/types';
import user from './data.json';
import { id } from './utils';

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
	const comment = {
		id: id.next().value || 0,
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
 * Updates a comment
 * @param id of comment to update
 * @param content new content to update the comment to
 * @param username of user trying to update the comment
 * @returns updated comments list
 */
function updateComment(id: number, content: string, username: String) {
	const commentIndex = user.comments.findIndex((c) => c.id === id);

	if (commentIndex === -1) {
		throw new Error(`Could not find comment with id: ${id}`);
	}

	if (user.comments[commentIndex].user.username !== username) {
		throw new Error(`You are not the owner of the comment with id (${id}) and cannot edit it!`);
	}

	user.comments[commentIndex].content = content;

	return user.comments;
}

/**
 * Increments the score of a comment
 * @param id of the comment to increment
 * @returns updated list of comments
 */
function incrementScore(id: number) {
	return addToScore(id, 1);
}

/**
 * Decrements the score of a comment
 * @param id of the comment to decrement
 * @returns updated list of comments
 */
function decrementScore(id: number) {
	return addToScore(id, -1);
}

/**
 * Adds a number to the score of a comment
 * @param id of the comment to add the score to
 * @param number number to add to the score
 * @returns updated list of comments
 */
function addToScore(id: number, number: number) {
	const commentIndex = user.comments.findIndex((c) => c.id === id);

	if (commentIndex === -1) {
		throw new Error(`Could not find comment with id: ${id}`);
	}

	const score = user.comments[commentIndex].score;
	user.comments[commentIndex].score = score + number;

	return user.comments;
}

export const comment = {
	findAll,
	add,
	deleteComment,
	updateComment,
	incrementScore,
	decrementScore
};
