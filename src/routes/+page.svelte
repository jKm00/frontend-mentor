<script lang="ts">
	import { auth } from '$lib/auth.js';
	import AddComment from '$lib/components/custom/AddComment.svelte';
	import Comment from '$lib/components/custom/Comment.svelte';
	import { toast } from 'svelte-sonner';

	export let data;
	export let form;

	let { currentUser, comments } = data;

	$: if (form?.status === 201 && form.data) {
		comments = form.data;
		toast.success('Comment posted!');
	}

	$: auth.set(currentUser);
</script>

<section class="mb-4 grid gap-4">
	{#each comments as comment}
		<Comment {comment} />
	{/each}
</section>

<AddComment {currentUser} />
