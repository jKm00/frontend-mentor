const PROFILE_PICTURES = ['juliusomo', 'amyrobson', 'maxblagun', 'ramsesmiron'];

export function getUserObject(username: string) {
	const ppIndex = username?.length % PROFILE_PICTURES.length;

	return {
		image: {
			png: `./images/avatars/image-${PROFILE_PICTURES[ppIndex]}.png`,
			webp: `./images/avatars/image-${PROFILE_PICTURES[ppIndex]}.webp`
		},
		username
	};
}
