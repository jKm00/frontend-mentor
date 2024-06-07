import user from './data.json';

export function getNextId() {
	let highestIndex = 0;
	user.comments.forEach((c) => {
		if (c.id > highestIndex) {
			highestIndex = c.id;
		}

		c.replies.forEach((r) => {
			if (r.id > highestIndex) {
				highestIndex = r.id;
			}
		});
	});

	return highestIndex + 1;
}
