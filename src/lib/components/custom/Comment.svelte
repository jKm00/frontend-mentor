<script lang="ts">
	import type { Comment } from '$lib/types';
	import CommentCard from './cards/CommentCard.svelte';

	export let comment: Comment;
</script>

<div>
	<CommentCard
		id={comment.id}
		profilePicture={comment.user.image.png}
		username={comment.user.username}
		createdAt={comment.createdAt}
		content={comment.content}
		score={comment.score}
	/>

	{#if comment.replies.length > 0}
		<div class="mt-4 grid gap-4 border-l pl-4 md:ml-8 md:pl-8">
			{#each comment.replies as reply}
				<CommentCard
					id={reply.id}
					profilePicture={reply.user.image.png}
					username={reply.user.username}
					createdAt={reply.createdAt}
					content={reply.content}
					score={reply.score}
					replyingTo={reply.replyingTo}
					commentId={comment.id}
				/>
			{/each}
		</div>
	{/if}
</div>
