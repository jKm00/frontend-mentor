<script lang="ts">
	import type { Board } from '@/models/Board';
	import ThemeToggler from '@/components/ThemeToggler.svelte';
	import BoardView from '@/components/BoardView.svelte';

	const boards: Board[] = [
		{
			id: 0,
			name: 'Platform Launch',
			lists: [
				{
					name: 'Todo',
					color: '#4ac3e8',
					tasks: [
						{
							id: 1,
							name: 'Build UI for onboardin flow',
							desc: '...',
							subtasks: [
								{
									id: 2,
									name: 'subtask 1',
									completed: false
								},
								{
									id: 3,
									name: 'subtask 2',
									completed: false
								}
							],
							status: 'todo'
						},
						{
							id: 4,
							name: 'Build UI for search',
							desc: '...',
							status: 'todo'
						}
					]
				},
				{
					name: 'Doing',
					color: '#836ff4',
					tasks: [
						{
							id: 4,
							name: 'Design settings and search pages',
							desc: '...',
							status: 'doing'
						}
					]
				},
				{
					name: 'Done',
					color: '#66e0ad',
					tasks: [
						{
							id: 5,
							name: 'Conduct 5 wireframe tests',
							desc: '...',
							status: 'Done'
						}
					]
				}
			]
		},
		{
			id: 2,
			name: 'Marketing Plan',
			lists: []
		}
	];

	let activeBoard = boards[0] ?? null;
</script>

<section class="sidebar">
	<nav class="nav">
		<h1 class="logo">kanban</h1>
		<h2 class="nav__label">All boards ({boards.length})</h2>
		<ul class="nav__list">
			{#each boards as board}
				<li class="nav__item">
					<button
						class="nav__item__button"
						on:click={() => (activeBoard = board)}
						data-active={board.id == activeBoard.id}>{board.name}</button
					>
				</li>
			{/each}
		</ul>
		<button class="nav__button--add">+ Create New Board</button>
	</nav>
	<footer class="footer">
		<ThemeToggler />
		<button class="sidebar-toggler"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
				><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
				/></svg
			>Hide Sidebar</button
		>
		<p class="legal">&copy; Joakim Edvardsen 2023</p>
	</footer>
</section>
<main class="main">
	<BoardView board={activeBoard} />
</main>

<style scoped>
	/* Sidebar */
	.sidebar {
		--padding: 2rem;

		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-between;

		background-color: var(--clr-el);
		padding-block: 1rem;
	}

	.logo {
		font-size: 2rem;
		padding-inline: var(--padding);
		margin-bottom: 2rem;
	}

	/* Nav list */
	.nav {
		width: 100%;
	}

	.nav__list {
		padding-right: 2rem;
	}

	.nav__label {
		font-size: var(--fs-label);
		text-transform: uppercase;
		letter-spacing: var(--ls);
		color: var(--clr-fg-200);

		padding-inline: var(--padding);
		margin-bottom: 1rem;
	}

	.nav__item__button {
		font-size: var(--fs-body);
		text-align: left;

		width: 100%;
		padding-block: 1rem;
		padding-inline: var(--padding);
		border-radius: 0 100vh 100vh 0;

		cursor: pointer;

		transition: background-color 150ms ease-in-out;
	}

	.nav__item__button:hover,
	.nav__item__button:focus-visible {
		background-color: var(--clr-bg);
	}

	.nav__item__button[data-active='true'] {
		color: var(--clr-accent-fg);
		background-color: var(--clr-accent-bg);
	}

	.nav__button--add {
		font-size: var(--fs-body);
		color: var(--clr-accent-bg);

		padding-block: 1rem;
		padding-inline: var(--padding);

		cursor: pointer;
	}

	.nav__button--add:hover,
	.nav__button--add:focus-visible {
		color: var(--clr-fg-400);
	}

	/* Sidebar footer */
	.footer {
		display: grid;
		gap: 1rem;
		width: 100%;
		padding-inline: var(--padding);
	}

	.sidebar-toggler {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: var(--fs-body);
		font-weight: 600;
		color: var(--clr-fg-200);
		cursor: pointer;
		margin-bottom: 1rem;
	}

	.sidebar-toggler svg {
		height: 1rem;
		fill: vaR(--clr-fg-200);
	}

	.legal {
		font-size: var(--fs-label);
		color: var(--clr-fg-200);
		text-align: center;
	}

	/* Main content */
	.main {
		display: grid;
		grid-template-rows: auto 1fr;
	}
</style>