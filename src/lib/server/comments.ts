import user from './data.json';

function findAll() {
	return user.comments;
}

export const comment = {
	findAll
};
