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

export const comment = {
	findAll,
	add
};
