<script lang="ts">
	import Options from '$lib/components/Options.svelte';
	import Result from '$lib/components/Result.svelte';
	import Rules from '$lib/components/Rules.svelte';
	import Score from '$lib/components/Score.svelte';
	import { GameStates, type Option } from '$lib/types';
	import { score } from '$lib/stores/scoreStore';

	let gameState = GameStates.WAITING;
	let humanPick: Option = 'rock';
	let computerPick: null | Option = null;

	const handleSelect = (event: CustomEvent) => {
		if (gameState !== GameStates.WAITING) return;

		humanPick = event.detail;
		gameState = GameStates.CHOOSING;

		computerSelect();
	};

	const computerSelect = () => {
		setTimeout(() => {
			let rand = Math.floor(Math.random() * 3);
			switch (rand) {
				case 0:
					computerPick = 'paper';
					break;
				case 1:
					computerPick = 'rock';
					break;
				case 2:
					computerPick = 'scissors';
					break;
			}
			validate();
		}, 1000);
	};

	const validate = () => {
		gameState === GameStates.VALIDATING;

		if (humanPick === 'paper') {
			if (computerPick === 'paper') {
				draw();
			} else if (computerPick === 'rock') {
				won();
			} else if (computerPick === 'scissors') {
				lost();
			}
		} else if (humanPick === 'rock') {
			if (computerPick === 'paper') {
				lost();
			} else if (computerPick === 'rock') {
				draw();
			} else if (computerPick === 'scissors') {
				won();
			}
		} else if (humanPick === 'scissors') {
			if (computerPick === 'paper') {
				won();
			} else if (computerPick === 'rock') {
				lost();
			} else if (computerPick === 'scissors') {
				draw();
			}
		}
	};

	const won = () => {
		gameState = GameStates.WON;
		score.incrememt();
	};

	const lost = () => {
		gameState = GameStates.LOST;
		score.decrement();
	};

	const draw = () => {
		gameState = GameStates.DRAW;
	};

	const restartGame = () => {
		computerPick = null;
		gameState = GameStates.WAITING;
	};
</script>

<main class="page">
	<Score score={$score}>
		<p>Rock</p>
		<p>Paper</p>
		<p>Scissors</p>
	</Score>
	{#if gameState === GameStates.WAITING}
		<Options on:select={handleSelect} />
	{:else}
		<Result on:restart={restartGame} {humanPick} {computerPick} state={gameState} />
	{/if}
	<Rules />
</main>

<style scoped>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		padding: 2rem;
	}
</style>
