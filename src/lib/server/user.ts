import user from './data.json';

function get() {
	return user.currentUser;
}

export const currentUser = {
	get
};
