import user from './data.json';

export function findAll() {
	return user.comments;
}

export function incrementScore(id: number) {
	const comment = user.comments.find((comment) => {
		if (comment.id === id) {
			return comment;
		}

		comment.replies.find((reply) => {
			if (reply.id === id) {
				return comment;
			}
		});
	});

	if (comment) {
		comment.score = comment.score + 1;
	}
}
