<script lang="ts">
	import type { Task } from '@/models/Task';

	export let task: Task | undefined;
	export let availableStatus: string[];
</script>

<div class="card">
	<h2 class="title">{task?.name}</h2>
	<p class="desc">{task?.desc}</p>
	{#if task?.subtasks}
		<section class="section">
			<h3 class="title--small">
				Subtasks ({task.subtasks.filter((s) => s.completed).length} of {task.subtasks.length})
			</h3>
			{#each task.subtasks as subtask}
				<div class="subtask">
					<input
						id={`${subtask.id}`}
						type="checkbox"
						bind:checked={subtask.completed}
						class="subtask__checkbox"
					/>
					<label for={`${subtask.id}`} data-checked={subtask.completed}>{subtask.name}</label>
				</div>
			{/each}
		</section>
	{/if}
	<section class="section">
		<h3 class="title--small">Status</h3>
		<select name="status">
			{#each availableStatus as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</section>
</div>

<style scoped>
	.card {
		width: 32rem;
		display: grid;
		gap: 1.5rem;
	}

	.title {
		font-size: 1.25rem;
	}

	.title--small {
		font-size: 1rem;
	}

	.desc {
		font-size: var(--fs-body);
		line-height: 1.5em;
		color: var(--clr-fg-200);
	}

	.section {
		display: grid;
		gap: 0.5rem;
	}

	.subtask {
		display: flex;
		gap: 1rem;

		font-size: var(--fs-label);

		background-color: var(--clr-bg);
		padding: 1rem;
		border-radius: 0.2rem;
	}

	.subtask label[data-checked='true'] {
		color: var(--clr-fg-200);
		text-decoration: line-through;
	}
</style>
