<script lang="ts">
	import type { Option } from '$lib/types';

	export let type: Option;
	export let disabled = false;
	export let showGradient = false;

	$: svg = getSvg();
	$: alt = getAlt();
	$: border = getBorder();

	function getSvg() {
		switch (type) {
			case 'rock':
				return 'icon-rock.svg';
			case 'paper':
				return 'icon-paper.svg';
			case 'scissors':
				return 'icon-scissors.svg';
		}
	}

	function getAlt() {
		switch (type) {
			case 'rock':
				return 'Rock icon';
			case 'paper':
				return 'Paper icon';
			case 'scissors':
				return 'Scissors icon';
		}
	}

	function getBorder() {
		switch (type) {
			case 'rock':
				return '--gradient-rock';
			case 'paper':
				return '--gradient-paper';
			case 'scissors':
				return '--gradient-scissors';
		}
	}
</script>

<button
	on:click
	{disabled}
	class="option {showGradient ? 'gradient' : ''}"
	style="--border: var({border}); {disabled ? '--scale: 1; --cursor: default' : ''}"
>
	<img src="/svgs/{svg}" {alt} />
</button>

<style scoped>
	.option {
		--cursor: pointer;
		--size: 125px;
		width: var(--size);
		height: var(--size);
		padding: 1rem;
		border-radius: 100vw;
		background: var(--border);
		cursor: var(--cursor);

		transition: transform 150ms ease-in-out;
	}

	.option:hover,
	.option:focus-visible {
		--scale: 1.1;
		transform: scale(var(--scale));
	}

	.option img {
		background-color: white;
		border-radius: 100vw;
		width: 100%;
		height: 100%;
		padding: 1.75rem;
		box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2) inset;
	}

	.gradient {
		--opacity: 0.03;
		box-shadow: 0 0 0 15px rgba(255 255 255 / var(--opacity)),
			0 0 0 40px rgba(255 255 255 / var(--opacity)), 0 0 0 75px rgba(255 255 255 / var(--opacity));
	}
</style>
