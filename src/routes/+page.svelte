<script>
	import CommentCard from '$lib/components/custom/cards/CommentCard.svelte';

	export let data;

	const { comments } = data;
</script>

<section class="grid gap-4">
	{#each comments as comment}
		<CommentCard {comment} />
	{/each}
</section>

<style>
</style>
