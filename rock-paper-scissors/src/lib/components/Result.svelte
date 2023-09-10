<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import OptionButton from './OptionButton.svelte';
	import { GameStates, type Option } from '$lib/types';

	const dispatch = createEventDispatcher<{ restart: null }>();

	export let humanPick: Option;
	export let computerPick: null | Option = null;
	export let state: GameStates;

	const handleRestart = () => {
		dispatch('restart');
	};
</script>

<div class="result">
	<div class="picks">
		<div class="picked">
			<OptionButton type={humanPick} disabled={true} showGradient={state === GameStates.WON} />
			<h2>You picked</h2>
		</div>
		<div class="picked">
			{#if computerPick}
				<OptionButton
					type={computerPick}
					disabled={true}
					showGradient={state === GameStates.LOST}
				/>
			{:else}
				<div class="placeholder" />
			{/if}
			<h2>The house picked</h2>
		</div>
	</div>
	{#if state === GameStates.WON || state === GameStates.LOST || state === GameStates.DRAW}
		<div class="wrapper">
			<h3 class="title">
				{state === GameStates.WON ? 'You win' : state === GameStates.LOST ? 'You loose' : 'Draw'}
			</h3>
			<button on:click={handleRestart} class="restart">Play again</button>
		</div>
	{/if}
</div>

<style scoped>
	.result {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 4rem;
		margin-top: 7rem;
		color: white;
		text-transform: uppercase;
		text-align: center;
	}

	.picks {
		display: flex;
		justify-content: center;
		align-items: start;
		gap: 4rem;
	}

	.picked {
		display: grid;
		gap: 1rem;
		align-items: end;
		justify-items: center;
		font-size: 0.6rem;
	}

	.placeholder {
		--size: 125px;
		background-color: rgba(0 0 0 / 0.3);
		height: var(--size);
		width: var(--size);
		border-radius: 100vw;
	}

	.wrapper {
		display: grid;
		justify-content: center;
		gap: 1rem;
	}

	.title {
		font-size: 3rem;
	}

	.restart {
		background-color: white;
		padding: 1rem 5rem;
		border-radius: 0.5rem;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--text-dark);
		cursor: pointer;

		transition: transform 50ms ease-in-out;
	}

	.restart:active {
		transform: scale(0.95);
	}
</style>
