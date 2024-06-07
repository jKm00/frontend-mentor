<script lang="ts">
	import { auth } from '$lib/auth';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Minus, Plus, Reply as ReplyIcon, Trash, Pencil, Save } from 'lucide-svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	export let id: number; // Id of the current comment/reply
	export let profilePicture: string;
	export let username: string;
	export let createdAt: string;
	export let content: string;
	export let score: number;
	export let replyingTo = ''; // The name of the original comment author if this is a reply
	export let commentId: number | null = null; // The id of the original comment author if this is a reply

	$: isReply = commentId !== null;

	let editing = false;
	let replying = false;

	function saveComment() {
		// TODO...

		editing = false;
	}

	function addReply() {
		replying = false;
	}
</script>

<article class="grid rounded-lg bg-card p-4">
	<div id="header" class="flex items-center gap-4">
		<img src={profilePicture} alt="{username}'s profile picture" class="h-8 w-8" />
		<p class="font-bold">{username}</p>
		<span>{createdAt}</span>
	</div>
	<div id="body">
		{#if editing}
			<form>
				<input type="hidden" name="id" value={id} />
				<Textarea bind:value={content} class="w-full bg-card" />
			</form>
		{:else}
			<p>
				{#if replyingTo !== ''}
					<span class="font-bold text-primary">@{replyingTo} </span>
				{/if}
				{content}
			</p>
		{/if}
	</div>
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
			{#if isReply}
				<form action="?/deleteReply" method="POST" use:enhance>
					<input type="hidden" name="commentId" value={commentId} />
					<input type="hidden" name="replyId" value={id} />
					<Button
						type="submit"
						variant="ghost"
						class="flex items-center gap-2 font-bold text-destructive"
						><Trash class="h-4 w-4" />Delete</Button
					>
				</form>
			{:else}
				<form action="?/deleteComment" method="POST" use:enhance>
					<input type="hidden" name="id" value={id} />
					<Button
						type="submit"
						variant="ghost"
						class="flex items-center gap-2 font-bold text-destructive"
						><Trash class="h-4 w-4" />Delete</Button
					>
				</form>
			{/if}
			{#if editing}
				<Button
					on:click={() => saveComment()}
					variant="ghost"
					class="flex items-center gap-2 font-bold text-primary"
					><Save class="h-4 w-4" />Save</Button
				>
			{:else}
				<Button
					on:click={() => (editing = true)}
					variant="ghost"
					class="flex items-center gap-2 font-bold text-primary"
					><Pencil class="h-4 w-4" />Edit</Button
				>
			{/if}
		{:else}
			<Button
				on:click={() => (replying = !replying)}
				variant="ghost"
				class="flex items-center gap-2 font-bold text-primary"
			>
				{#if replying}
					Cancel
				{:else}
					<ReplyIcon class="h-4 w-4" />
					Reply
				{/if}
			</Button>
		{/if}
	</div>
</article>

{#if replying}
	<form
		transition:fade={{ duration: 150 }}
		method="POST"
		action="?/addReply"
		use:enhance={addReply}
		class="mt-4 flex flex-col gap-2 rounded-lg bg-card p-4"
	>
		<input type="hidden" name="commentId" value={isReply ? commentId : id} />
		<input type="hidden" name="replyingTo" value={username} />
		<Textarea name="content" placeholder="Add a reply..." class="resize-y bg-card" />
		<Button type="submit" class="self-end">Post reply</Button>
	</form>
{/if}

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
