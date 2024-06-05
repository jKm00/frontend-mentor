import { comment } from '$lib/server/comments';
import { currentUser } from '$lib/server/user';

export const load = async () => {
	function fetchComments() {
		return comment.findAll();
	}

	function fetchUser() {
		return currentUser.get();
	}

	return {
		currentUser: fetchUser(),
		comments: fetchComments()
	};
};
