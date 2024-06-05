<script lang="ts">
	import { auth } from '$lib/auth.js';
	import AddComment from '$lib/components/custom/AddComment.svelte';
	import Comment from '$lib/components/custom/Comment.svelte';

	export let data;

	const { currentUser, comments } = data;

	$: auth.set(currentUser);
</script>

<section class="mb-4 grid gap-4">
	{#each comments as comment}
		<Comment {comment} />
	{/each}
</section>

<AddComment {currentUser} />
