<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import type { User } from '$lib/types';
	import { Button } from '$lib/components/ui/button';

	export let currentUser: User;
</script>

<div class="grid gap-4 rounded-lg bg-card p-4">
	<div id="comment">
		<Textarea placeholder="Add a comment..." class="w-full resize-y bg-card" />
	</div>
	<img
		src={currentUser.image.png}
		alt="{currentUser.username}'s profile picture"
		id="image"
		class="h-8 w-8"
	/>
	<div id="button" class="justify-self-end">
		<Button class="px-6">SEND</Button>
	</div>
</div>

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
