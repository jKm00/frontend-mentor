<script lang="ts">
	import type { Board } from '@/models/Board';
	import type { Task } from '@/models/Task';
	import Modal from './Modal.svelte';
	import TaskDetails from './TaskDetails.svelte';
	import boards from '@/stores/boards';

	export let boardId: number;

	$: board = $boards.find((b) => b.id === boardId);

	let showModal = false;
	let selectedTask: Task;

	let titleHover = false;
	let editTitle = false;

	const handleNameChange = () => {
		if (board !== undefined) {
			$boards[boardId].name = board?.name;
		}
		editTitle = false;
		titleHover = false;
	};

	const handleDelete = () => {
		$boards = $boards.filter((b) => b.id !== boardId);
		titleHover = false;
	};

	const handleItemClick = (task: Task) => {
		selectedTask = task;
		showModal = true;
	};
</script>

{#if board}
	<header class="header">
		{#if editTitle}
			<form class="flex-grow" on:submit|preventDefault={handleNameChange}>
				<input type="text" class="input" bind:value={board.name} />
				<button class="btn btn--small">Save</button>
			</form>
		{:else}
			<h2
				class="title flex-grow"
				on:mouseenter={() => (titleHover = true)}
				on:mouseleave={() => (titleHover = false)}
			>
				{board.name}
				{#if titleHover}
					<div class="btn-group">
						<button on:click={() => (editTitle = true)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
								><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
								/></svg
							>
						</button>
						<button on:click={handleDelete}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
								><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
								/></svg
							>
						</button>
					</div>
				{/if}
			</h2>
		{/if}
		<button class="btn">+ Add New Task</button>
	</header>
	<section class="content">
		{#each board.lists as list}
			<div class="list">
				<h3 class="list__title">
					<span class="color-circle" style={`background-color: ${list.color}`} />{list.name} ({list
						.tasks.length})
				</h3>
				{#each list.tasks as task}
					<button class="item" on:click={() => handleItemClick(task)}>
						<h4 class="item__title">{task.name}</h4>
						<p class="item__label">
							{#if task.subtasks}
								{task.subtasks?.filter((s) => s.completed).length} of {task.subtasks?.length} subtasks
							{:else}
								0 subtasks
							{/if}
						</p>
					</button>
				{/each}
			</div>
		{/each}
	</section>
	<Modal bind:showModal>
		<TaskDetails task={selectedTask} availableStatus={board.lists.map((l) => l.name)} />
	</Modal>
{:else}
	<div class="placeholder-section">
		<p class="placeholder">
			No boards to show... Create your first to start tracking your projects!
		</p>
		<button class="btn">+ Create New Board</button>
	</div>
{/if}

<style scoped>
	/* Header */
	.header {
		display: flex;

		padding: 1rem 2rem;
		background-color: var(--clr-el);
	}

	.flex-grow {
		flex-grow: 1;
	}

	.title {
		display: flex;
		gap: 2rem;
		font-size: 1.5rem;
	}

	.title button {
		cursor: pointer;
	}

	.title svg {
		fill: var(--clr-fg-400);
		width: 1rem;
	}

	.btn-group {
		display: flex;
		gap: 1rem;
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

	/* Placeholder section */

	.placeholder-section {
		display: grid;
		gap: 1rem;
		height: 100vh;
		justify-content: center;
		justify-items: center;
		align-content: center;
	}
</style>
