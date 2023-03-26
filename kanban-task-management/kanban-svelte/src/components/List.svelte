<script lang="ts">
	import type { List } from '@/models/List';
	import tasks from '@/stores/tasks';
	import subtasks from '@/stores/subtasks';
	import type { Task } from '@/models/Task';
	import TaskDetails from './TaskDetails.svelte';
	import Modal from './Modal.svelte';

	// All lists in the current board
	export let lists: List[];
	// The list to display
	export let list: List;
	// List of all status a task can be ('todo', 'done', ...)
	export let availableStatus: string[];

	let showModal = false;
	let selectedTask: Task;

	/**
	 * Shows task details
	 * @param task to display details of
	 */
	const handleItemClick = (task: Task) => {
		selectedTask = task;
		showModal = true;
	};

	/**
	 * Changes the status of a task
	 * @param task to change the status of
	 * @param status the task is changed to
	 */
	const changeTaskStatus = (task: Task, status: string) => {
		tasks.update((store) => {
			const newListId = lists.find((l) => l.name === status)?.id;
			if (newListId === undefined) return store;

			const updatedTask = {
				...task,
				listId: newListId,
				status: status
			};
			const updatedTaskList = store.map((t) => {
				if (t.id === task.id) {
					return updatedTask;
				} else {
					return t;
				}
			});

			selectedTask = updatedTask;

			return updatedTaskList;
		});
	};
</script>

<div class="list">
	<h3 class="list__title">
		<span class="color-circle" style={`background-color: ${list.color}`} />{list.name} ({$tasks.filter(
			(t) => t.listId === list.id
		).length})
	</h3>
	<div class="task-wrapper">
		{#each $tasks.filter((t) => t.listId === list.id) as task, taskIndex}
			<button class="item" on:click={() => handleItemClick(task)}>
				<h4 class="item__title">{task.name}</h4>
				<p class="item__label">
					{#if $subtasks.filter((s) => s.taskId === task.id).length > 0}
						{$subtasks.filter((s) => s.taskId === task.id && s.completed).length} of {$subtasks.filter(
							(s) => s.taskId === task.id
						).length} subtasks
					{:else}
						0 subtasks
					{/if}
				</p>
			</button>
		{/each}
	</div>
</div>
<Modal bind:showModal>
	<TaskDetails
		task={selectedTask}
		{availableStatus}
		on:change={(event) => changeTaskStatus(selectedTask, event.detail.status)}
	/>
</Modal>

<style scoped>
	/* List */
	.list {
		flex-basis: 20rem;
		flex-shrink: 0;

		display: grid;
		grid-template-rows: auto 1fr;
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

	.task-wrapper {
		outline-color: transparent;
		transition: outline 150ms ease-in-out;
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
