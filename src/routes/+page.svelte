<script lang="ts">
	import AddComment from '$lib/components/custom/AddComment.svelte';
	import Comment from '$lib/components/custom/Comment.svelte';

	export let data;

	const { currentUser, comments } = data;
</script>

<section class="mb-4 grid gap-4">
	{#each comments as comment}
		<Comment {comment} />
	{/each}
</section>

<AddComment {currentUser} />
