<script lang="ts">
	export let score: number;
</script>

<div class="score-wrapper">
	<div class="label">
		<slot />
	</div>
	<div class="score">
		<p class="score-label">Score</p>
		<p class="score-value">{score}</p>
	</div>
</div>

<style scoped>
	.score-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 3px solid var(--outline);
		border-radius: 0.3rem;
		padding: 0.75rem 0.75rem 0.75rem 1.5rem;
		width: min(40rem, 100%);
	}

	.label {
		color: white;
		font-weight: 700;
	}

	.score {
		background-color: white;
		padding: 1rem;
		border-radius: 0.25rem;
		text-align: center;
		color: var(--text-dark);
	}

	.score-label {
		text-transform: uppercase;
		font-weight: 600;
		font-size: 0.75rem;
	}

	.score-value {
		font-weight: 700;
		font-size: 2rem;
	}
</style>
