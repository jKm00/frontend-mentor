<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '../stores/theme';
	import './styles.css';

	let body: HTMLElement | null;

	onMount(() => {
		body = document.querySelector('body');
	});

	$: body?.setAttribute('data-theme', $theme);

	const toggleTheme = () => {
		theme.update(() => {
			return $theme === 'dark' ? 'light' : 'dark';
		});
	};
</script>

<header class="header">
	<div class="content">
		<h1 class="title">Where in the world?</h1>
		<div class="theme-toggler">
			<label for="theme-toggler" class="theme-toggler-label">
				{#if $theme === 'dark'}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
						/></svg
					>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"
						/></svg
					>
				{/if}
				<p class="theme-toggler-text">Dark Mode</p>
			</label>
			<input type="checkbox" id="theme-toggler" on:change={toggleTheme} />
		</div>
	</div>
</header>

<main class="main">
	<slot />
</main>

<style scoped>
	.header {
		background-color: var(--clr-el);
		padding: 2rem 1rem;
		box-shadow: 0 5px 5px rgba(0 0 0 / 0.1);
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;

		max-width: 1440px;
		margin: auto;
		padding: 0 1rem;
	}

	.title {
		font-size: 1.2rem;
		color: var(--clr-fg);
	}

	svg {
		width: 0.8rem;
		transform: rotate(-20deg);
		fill: var(--clr-fg);
	}

	.theme-toggler input {
		display: none;
	}

	.theme-toggler-label {
		display: flex;
		gap: 1rem;
		font-weight: 600;
		cursor: pointer;
		color: vaR(--clr-fg);
	}

	.main {
		min-height: calc(100dvh - 90px);
		padding: 1rem;
		max-width: 1440px;
		margin: auto;
	}
</style>
