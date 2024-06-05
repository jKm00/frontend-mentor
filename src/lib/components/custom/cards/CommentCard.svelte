<script lang="ts">
	import { auth } from '$lib/auth';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Minus, Plus, Reply as ReplyIcon, Trash, Pencil } from 'lucide-svelte';

	export let profilePicture: string;
	export let username: string;
	export let createdAt: string;
	export let content: string;
	export let score: number;
	export let replyingTo = '';
</script>

<article class="grid rounded-lg bg-card p-4">
	<div id="header" class="flex items-center gap-4">
		<img src={profilePicture} alt="{username}'s profile picture" class="h-8 w-8" />
		<p class="font-bold">{username}</p>
		<span>{createdAt}</span>
	</div>
	<p id="body">
		{#if replyingTo !== ''}
			<span class="font-bold text-primary">@{replyingTo} </span>
		{/if}
		{content}
	</p>
	<div
		id="vote"
		class="flex items-center justify-self-start rounded-lg bg-primary/10 md:flex-col md:self-start"
	>
		<button class="p-3 font-bold"><Plus class="h-4 w-4 text-primary/50" /></button>
		<span class="font-bold text-primary">{score}</span>
		<button class="p-3 font-bold"><Minus class="h-4 w-4 text-primary/50" /></button>
	</div>
	<div id="reply" class="flex justify-self-end">
		{#if $auth?.username === username}
			<Button variant="ghost" class="flex items-center gap-2 font-bold text-destructive"
				><Trash class="h-4 w-4" />Delete</Button
			>
			<Button variant="ghost" class="flex items-center gap-2 font-bold text-primary"
				><Pencil class="h-4 w-4" />Edit</Button
			>
		{:else}
			<Button variant="ghost" class="flex items-center gap-2 font-bold text-primary">
				<ReplyIcon class="h-4 w-4" />
				Reply
			</Button>
		{/if}
	</div>
</article>

<style scoped>
	.grid {
		display: grid;
		grid-template-areas:
			'header header'
			'body body'
			'vote reply';
		gap: 1rem;
	}

	#header {
		grid-area: header;
	}

	#body {
		grid-area: body;
	}

	#vote {
		grid-area: vote;
	}

	#reply {
		grid-area: reply;
	}

	@media only screen and (min-width: 768px) {
		.grid {
			grid-template-columns: auto 1fr 1fr;
			grid-template-areas:
				'vote header reply'
				'vote body body';
		}
	}
</style>
