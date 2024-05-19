<script lang="ts">
	import CommentCard from './CommentCard.svelte';
	import type { Comment } from '$lib/types';
	import { Reply as ReplyIcon } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	export let comment: Comment;
</script>

<div>
	<!-- Comment card -->
	<article class="wrapper rounded-lg bg-card p-4">
		<div class="custom-grid | gap-4">
			<!-- Header -->
			<div class="header flex items-center gap-4">
				<img
					class="w-10"
					src={comment.user.image.png}
					alt="{comment.user.username}'s profile picture"
				/>
				<p class="font-bold">{comment.user.username}</p>
				<span class="text-muted-foreground">{comment.createdAt}</span>
			</div>
			<!-- Body -->
			<p class="body">
				{#if comment.replyingTo}
					<span class="font-bold text-accent">@{comment.replyingTo}</span>
				{/if}
				{comment.content}
			</p>
			<!-- Like/Dislike -->
			<form
				class="like flex items-center gap-3 self-start justify-self-start rounded-md bg-background px-4 py-2 font-bold text-accent"
				method="post"
				use:enhance
			>
				<input type="hidden" name="id" value={comment.id} />
				<button formaction="?/like">+</button>
				<span>{comment.score}</span>
				<button>-</button>
			</form>
			<!-- Reply -->
			<button class="reply flex items-center justify-self-end font-bold text-accent"
				><ReplyIcon class="mr-2 h-4 w-4" />Reply</button
			>
		</div>
	</article>

	<!-- Replies -->
	{#if comment.replies && comment.replies.length > 0}
		<div class="mt-4 grid gap-4 border-l pl-4 md:ml-8 md:pl-8">
			{#each comment.replies as reply}
				<CommentCard comment={reply} />
			{/each}
		</div>
	{/if}
</div>

<style scoped>
	.wrapper {
		container-type: inline-size;
	}

	.custom-grid {
		display: grid;
		grid-template-areas:
			'header header'
			'body body'
			'like reply';
	}

	.header {
		grid-area: header;
	}

	.body {
		grid-area: body;
	}

	.like {
		grid-area: like;
	}

	.reply {
		grid-area: reply;
	}

	@container (min-width: 600px) {
		.custom-grid {
			grid-template-areas:
				'like header reply'
				'like body body';
		}

		.like {
			flex-direction: column;
		}
	}
</style>
