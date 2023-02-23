<nav class="nav">
	<a class="home-btn" href="/"
		><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
			><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
			/></svg
		>Back</a
	>
</nav>

<slot />

<style scoped>
	.nav {
		display: flex;
		margin-block: 5rem;
	}

	.home-btn {
		display: flex;
		align-items: center;
		gap: 1rem;
		align-self: flex-start;
		background-color: var(--clr-el);
		padding: 0.5em 1.75em;
		box-shadow: 0 0 10px rgba(0 0 0 / 0.3);

		color: var(--clr-fg);
		text-decoration: none;
	}

	.home-btn svg {
		width: 1.25rem;
	}

	.home-btn:hover,
	.home-btn:focus-visible {
		filter: invert(0.005);
	}

	.home-btn:active {
		filter: invert(0.01);
	}
</style>
