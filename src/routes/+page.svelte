<script lang="ts">
	import { auth } from '$lib/auth.js';
	import AddComment from '$lib/components/custom/AddComment.svelte';
	import Comment from '$lib/components/custom/Comment.svelte';
	import { toast } from 'svelte-sonner';

	export let data;
	export let form;

	let { comments } = data;

	$: if (form && String(form.status)[0] === '2' && form.data && form.message) {
		toast.success(form.message);
	}

	$: if (form && form.data) {
		comments = form.data;
	}
</script>

<div class="flex flex-grow flex-col justify-between">
	<section class="mb-4 grid gap-4">
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	</section>

	<AddComment />
</div>
