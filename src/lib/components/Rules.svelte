<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let showRules = false;
</script>

<button on:click={() => (showRules = true)} class="btn">Rules</button>
{#if showRules}
	<div in:scale={{ duration: 100, start: 0.7 }} out:fade={{ duration: 100 }} class="rules">
		<h1>Rules</h1>
		<img class="rules-img" src="/svgs/image-rules.svg" alt="Rules" />
		<button on:click={() => (showRules = false)} class="close-btn"
			><img src="/svgs/icon-close.svg" alt="Close icon" /></button
		>
	</div>
{/if}

<style scoped>
	.btn {
		align-self: center;
		text-transform: uppercase;
		color: white;
		font-weight: 600;
		border: 2px solid rgba(255 255 255 / 0.7);
		border-radius: 0.75em;
		padding: 0.75rem 2.5rem;
		cursor: pointer;

		transition: background-color 100ms ease-in-out, color 100ms ease-in-out,
			transform 50ms ease-in-out;
	}

	.btn:hover,
	.btn:focus-visible {
		background-color: white;
		color: var(--text-dark);
	}

	.btn:active {
		transform: scale(0.95);
	}

	.rules {
		position: absolute;
		inset: 0;
		display: grid;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		background-color: white;
		text-transform: uppercase;
		color: var(--text-dark);
	}

	.rules-img {
		max-width: 20rem;
	}

	.close-btn {
		cursor: pointer;

		transition: transform 50ms ease-in-out;
	}

	.close-btn:active {
		transform: scale(0.9);
	}
</style>
