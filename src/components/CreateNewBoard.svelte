<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		create: { name: string };
	}>();

	let name: string;

	const handleSubmit = () => {
		dispatch('create', {
			name: name
		});
		name = '';
	};
</script>

<div class="card">
	<h2 class="title">Create New Board</h2>
	<form on:submit|preventDefault={handleSubmit} class="form">
		<div class="input-group">
			<label for="board-name" class="input-label">Board Name</label>
			<input
				id="board-name"
				bind:value={name}
				type="text"
				class="input"
				placeholder="e.g. Roadmap"
			/>
		</div>
		<button type="submit" class="btn">Create Board</button>
	</form>
</div>

<style scoped>
	.card {
		width: 32rem;
	}

	.title {
		margin-bottom: 2rem;
	}
</style>
