export interface Comment {
	id: number;
	content: string;
	createdAt: string;
	score: number;
	user: User;
	replies?: Comment[];
	replyingTo?: string;
}

export interface User {
	image: {
		png: string;
		webp: string;
	};
	username: string;
}
