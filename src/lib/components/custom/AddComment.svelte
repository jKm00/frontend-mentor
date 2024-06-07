<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import { auth } from '$lib/auth';

	let comment = '';

	$: disableForm = comment === '';
</script>

<form method="POST" action="?/addComment" use:enhance class="grid gap-4 rounded-lg bg-card p-4">
	<input type="hidden" name="author" value={JSON.stringify($auth)} />
	<div id="comment">
		<Textarea
			bind:value={comment}
			name="content"
			placeholder="Add a comment..."
			class="w-full resize-y bg-card"
		/>
	</div>
	<img
		src={$auth?.image.png}
		alt="{$auth?.username}'s profile picture"
		id="image"
		class="h-8 w-8"
	/>
	<div id="button" class="justify-self-end">
		<Button disabled={disableForm} class="px-6" type="submit">SEND</Button>
	</div>
</form>

<style scoped>
	.grid {
		display: grid;
		grid-template-areas:
			'comment comment'
			'image button';
	}

	#comment {
		grid-area: comment;
	}

	#image {
		grid-area: image;
	}

	#button {
		grid-area: button;
	}

	@media only screen and (min-width: 768px) {
		.grid {
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'image comment button';
		}
	}
</style>
