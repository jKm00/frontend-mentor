<script lang="ts">
	import { auth } from '$lib/auth.js';
	import AddComment from '$lib/components/custom/AddComment.svelte';
	import Comment from '$lib/components/custom/Comment.svelte';
	import { toast } from 'svelte-sonner';

	export let data;
	export let form;

	let { currentUser, comments } = data;

	$: if (form && String(form.status)[0] === '2' && form.data && form.message) {
		comments = form.data;
		toast.success(form.message);
	}

	$: auth.set(currentUser);
</script>

<section class="mb-4 grid gap-4">
	{#each comments as comment}
		<Comment {comment} />
	{/each}
</section>

<AddComment {currentUser} />
