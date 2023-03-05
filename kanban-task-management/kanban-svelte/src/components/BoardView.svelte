<script lang="ts">
	import type { Board } from '@/models/Board';

	export let board: Board;
</script>

<header class="header">
	<h2 class="title">{board.name}</h2>
	<button class="btn">+ Add New Task</button>
</header>
<section class="content">
	{#each board.lists as list}
		<div class="list">
			<h3 class="list__title">
				<span class="color-circle" style={`background-color: ${list.color}`} />{list.name} ({list
					.tasks.length})
			</h3>
			{#each list.tasks as item}
				<button class="item">
					<h4 class="item__title">{item.name}</h4>
					<p class="item__label">
						{#if item.subtasks}
							{item.subtasks?.filter((s) => s.completed).length} of {item.subtasks?.length} subtasks
						{:else}
							0 subtasks
						{/if}
					</p>
				</button>
			{/each}
		</div>
	{/each}
</section>

<style scoped>
	/* Header */
	.header {
		display: flex;
		justify-content: space-between;

		padding: 1rem 2rem;
		background-color: var(--clr-el);
	}

	.title {
		font-size: 1.5rem;
	}

	/* Main content */
	.content {
		display: flex;
		gap: 2rem;

		background-color: var(--clr-bg);
		padding: 2rem;

		overflow-x: auto;
	}

	/* List */
	.list {
		flex-basis: 20rem;
		flex-shrink: 0;
	}

	.list__title {
		display: flex;
		gap: 0.5rem;

		font-size: var(--fs-label-big);
		color: var(--clr-fg-200);
		text-transform: uppercase;
		letter-spacing: var(--ls);

		margin-bottom: 1rem;
	}

	.color-circle {
		display: block;
		width: 1rem;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		background-color: #fff;
	}

	/* Item */
	.item {
		display: grid;
		gap: 0.25rem;

		text-align: left;

		background-color: var(--clr-el);
		padding: 1.5rem 1rem;
		width: 100%;

		border-radius: 0.25rem;

		cursor: pointer;
	}

	.item:not(:last-child) {
		margin-bottom: 1rem;
	}

	.item__title {
		font-size: var(--fs-body);
	}

	.item__label {
		font-size: var(--fs-label);
		color: var(--clr-fg-200);
	}
</style>
