<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import OptionButton from './OptionButton.svelte';
	import type { Option } from '$lib/types';

	const dispatch = createEventDispatcher<{ select: Option }>();

	const handleSelect = (option: Option) => {
		dispatch('select', option);
	};
</script>

<div class="options-wrapper">
	<div class="box">
		<div class="paper">
			<OptionButton type="paper" on:click={() => handleSelect('paper')} />
		</div>
		<div class="scissors">
			<OptionButton type="scissors" on:click={() => handleSelect('scissors')} />
		</div>
		<div class="rock">
			<OptionButton type="rock" on:click={() => handleSelect('rock')} />
		</div>
	</div>
</div>

<style scoped>
	.options-wrapper {
		flex-grow: 1;
		display: grid;
		place-content: center;
	}

	.box {
		--size: 200px;
		position: relative;
		width: var(--size);
		aspect-ratio: 1 /1;

		background-image: url('/svgs/bg-triangle.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
	}

	.paper {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-40%, -40%);
	}

	.scissors {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(40%, -40%);
	}

	.rock {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 20%);
	}
</style>
