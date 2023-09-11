<script lang="ts">
	import type { Subtask } from '@/models/Subtask';
	import tasks from '@/stores/tasks';
	import lists from '@/stores/lists';
	import subtasks from '@/stores/subtasks';
	import { createEventDispatcher } from 'svelte';

	let subtaskPlaceholders = [
		'e.g. Make coffe',
		'e.g. Drink coffe & smile',
		'e.g. Wash dishes',
		'e.g. Walk the dog',
		'e.g. Call Mom',
		'e.g. Clean the bathroom',
		'e.g. Schedule appointment',
		'e.g. Read a book',
		'e.g. Make dinner',
		'e.g. Take out the trash',
		'e.g. Do laundry',
		'e.g. Water plants',
		'e.g. Fix leaky faucet',
		'e.g. Build a birdhouse',
		'e.g. Practice guitar for 1 hour',
		'e.g. Draft an outline for the report',
		'e.g. Design a logo and branding materials',
		'e.g. Write test cases and scenarios',
		'e.g. Create a project timeline and milestones',
		'e.g. Analyze data and metrics',
		'e.g. Set up a system for task tracking and progress reporting'
	];

	const dispatch = createEventDispatcher<{ create: {} }>();

	export let boardId: number;
	export let availableStatus: string[];

	const newTaskId = $tasks.length > 0 ? $tasks[$tasks.length - 1].id + 1 : 0;

	let title = '';
	let desc = '';
	let _subtasks: Subtask[] = [
		{
			id: 0,
			taskId: newTaskId,
			name: '',
			completed: false
		}
	];
	let status: string;

	const getRandomPlaceholder = (): string => {
		const index = Math.floor(Math.random() * subtaskPlaceholders.length);
		const placeholder = subtaskPlaceholders[index];
		subtaskPlaceholders = subtaskPlaceholders.filter((p) => p !== placeholder);
		return placeholder;
	};

	const removeSubtask = (id: number) => {
		_subtasks = _subtasks.filter((s) => s.id !== id);
	};

	const addSubtask = () => {
		const newId =
			$subtasks.length > 0
				? $subtasks[$subtasks.length - 1].id + 1 + _subtasks.length
				: _subtasks.length;

		_subtasks = [
			..._subtasks,
			{
				id: newId,
				taskId: newTaskId,
				name: '',
				completed: false
			}
		];
	};

	const handleSubmit = () => {
		if (title.length === 0) return;

		const listId = $lists.find((l) => l.boardId === boardId && l.name === status)?.id;
		if (listId === undefined) return;

		const newTaskId = $tasks.length > 0 ? $tasks[$tasks.length - 1].id + 1 : 0;

		// Create new task
		tasks.update((store) => {
			return [
				...store,
				{
					id: newTaskId,
					listId: listId,
					name: title,
					desc: desc,
					status: status
				}
			];
		});

		// Create all the subtasks
		_subtasks
			.filter((s) => s.name !== '')
			.forEach((s) => {
				subtasks.update((store) => {
					return [
						...store,
						{
							id: s.id,
							taskId: newTaskId,
							name: s.name,
							completed: s.completed
						}
					];
				});
			});

		// Reset all fields
		title = '';
		desc = '';
		_subtasks = [
			{
				id: 0,
				taskId: newTaskId,
				name: '',
				completed: false
			}
		];
		status = availableStatus[0];

		dispatch('create', {});
	};
</script>

<div class="card">
	<h2 class="title">Add New Task</h2>
	<form class="form" on:submit|preventDefault={handleSubmit}>
		<div class="input-group">
			<label for="task-title" class="input-label">Title</label>
			<input
				bind:value={title}
				id="task-title"
				class="input"
				type="text"
				placeholder="e.g. Take coffee break"
			/>
		</div>
		<div class="input-group">
			<label for="task-desc" class="input-label">Description</label>
			<textarea
				bind:value={desc}
				class="input"
				rows="4"
				placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
			/>
		</div>
		<div class="input-group">
			<p class="input-label">Subtasks</p>
			{#each _subtasks as subtask, i}
				<div class="subtask--wrapper">
					<input
						bind:value={subtask.name}
						type="text"
						class="input"
						placeholder={getRandomPlaceholder()}
					/>
					<button on:click={() => removeSubtask(subtask.id)} class="delete" type="button"
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
							><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
							/></svg
						></button
					>
				</div>
			{/each}
			<button on:click={addSubtask} class="btn btn--secondary add" type="button"
				>+ Add New Subtask</button
			>
		</div>
		<div class="input-group">
			<label for="status" class="input-label">Status</label>
			<select id="status" name="status" class="input" bind:value={status}>
				{#each availableStatus as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
		</div>
		<button type="submit" class="btn">Create Task</button>
	</form>
</div>

<style scoped>
	.card {
		width: 32rem;
	}

	.title {
		margin-bottom: 1rem;
	}

	.subtask--wrapper {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.5rem;
	}

	.delete {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 0.5rem;
		cursor: pointer;
	}

	.delete svg {
		fill: var(--clr-fg-200);
		width: 1rem;
	}

	.add {
		margin-top: 0.5rem;
	}
</style>
