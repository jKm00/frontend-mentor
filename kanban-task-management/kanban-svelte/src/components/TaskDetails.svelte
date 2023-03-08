<script lang="ts">
	import type { Subtask } from '@/models/Subtask';
	import type { Task } from '@/models/Task';
	import subtasks from '@/stores/subtasks';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ change: { status: string } }>();

	export let task: Task;
	export let availableStatus: string[];

	let status: string;

	const toggleSubtask = (subtask: Subtask) => {
		subtasks.update((store) => {
			const updatedSubtask = { ...subtask, completed: !subtask.completed };
			return store;
		});
	};

	const handleStatusChange = () => {
		dispatch('change', {
			status: status
		});
	};
</script>

<div class="card">
	<h2 class="title">{task?.name}</h2>
	<p class="desc">{task?.desc}</p>
	{#if $subtasks.find((s) => s.taskId === task.id)}
		<section class="section">
			<h3 class="title--small">
				Subtasks ({$subtasks.filter((s) => s.taskId === task.id && s.completed).length} of {$subtasks.filter(
					(s) => s.taskId === task.id
				).length})
			</h3>
			{#each $subtasks.filter((s) => s.taskId === task.id) as subtask}
				<div class="subtask">
					<input
						id={`${subtask.id}`}
						type="checkbox"
						bind:checked={subtask.completed}
						on:change={() => toggleSubtask(subtask)}
						class="subtask__checkbox"
					/>
					<label for={`${subtask.id}`} data-checked={subtask.completed}>{subtask.name}</label>
				</div>
			{/each}
		</section>
	{/if}
	<section class="section">
		<h3 class="title--small">Status</h3>
		<select name="status" class="input" bind:value={status} on:change={handleStatusChange}>
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
