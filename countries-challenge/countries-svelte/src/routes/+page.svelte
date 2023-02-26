<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let input = '';
	let region = '';

	let activeDropdown = false;

	$: filteredCountries = data.countries.filter((c: any) => {
		if (region === '') return c.name.common.toLowerCase().includes(input.toLowerCase());
		return (
			c.name.common.toLowerCase().includes(input.toLowerCase()) && c.region.toLowerCase() === region
		);
	});
</script>

<nav class="nav">
	<input class="search" type="text" placeholder="Search for a country..." bind:value={input} />
	<div class="dropdown-wrapper">
		<svg
			data-active-dropdown={activeDropdown}
			class="dropdown-icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
			/></svg
		>
		<select
			class="dropdown"
			name="regions"
			id="regions"
			bind:value={region}
			on:click={() => (activeDropdown = !activeDropdown)}
			on:focusout={() => (activeDropdown = false)}
		>
			<option value="" disabled selected>Filter by Region</option>
			<option value="">None</option>
			<option value="africa">Africa</option>
			<option value="america">America</option>
			<option value="asia">Asia</option>
			<option value="europe">Europe</option>
			<option value="oceania">Oceania</option>
		</select>
	</div>
</nav>

<section class="grid">
	{#each filteredCountries as country}
		<a class="card" href={`/countries/${country.name.common.toLowerCase()}`}>
			<img
				class="flag"
				src={country.flags.png}
				alt={`Official flag of ${country.name.official}`}
				loading="lazy"
			/>
			<div class="card-body">
				<h2 class="card-title">{country.name.common}</h2>
				<p class="card-stat">
					<span class="card-stat-label">Population:</span>
					{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				</p>
				<p class="card-stat"><span class="card-stat-label">Region:</span> {country.region}</p>
				<p class="card-stat"><span class="card-stat-label">Capital:</span> {country.capital}</p>
			</div>
		</a>
	{/each}
</section>

<style scoped>
	.nav {
		display: grid;
		gap: 2rem;
		margin-block: 2rem;
	}

	.search {
		border: none;
		padding: 1rem 1.5rem;
		border-radius: var(--border);
		box-shadow: var(--shadow-200);
		background-color: var(--clr-el);
		color: var(--clr-fg);
	}

	.search::placeholder {
		color: var(--clr-fg);
	}

	.dropdown-wrapper {
		position: relative;
		justify-self: start;
	}

	.dropdown {
		border: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		padding: 1rem 1.5rem;
		border-radius: var(--border);
		box-shadow: var(--shadow-200);
		background-color: var(--clr-el);
		color: var(--clr-fg);

		position: relative;
		min-width: 12rem;
	}

	.dropdown-icon {
		position: absolute;
		z-index: 1;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		width: 0.75rem;
		fill: var(--clr-fg);

		transition: transform 150ms ease-in-out;

		pointer-events: none;
	}

	.dropdown-icon[data-active-dropdown='true'] {
		transform: translateY(-50%) rotate(180deg);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	.card {
		background-color: var(--clr-el);
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 5px 10px rgb(0 0 0 / 0.05);

		color: var(--clr-fg);
		text-decoration: none;
	}

	.flag {
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	.card-body {
		padding: 2rem 2rem 3rem 2rem;
	}

	.card-title {
		margin-bottom: 1rem;
	}

	.card-stat:not(:last-child) {
		margin-bottom: 0.25rem;
	}

	.card-stat-label {
		font-weight: 800;
	}

	@media only screen and (min-width: 550px) {
		.nav {
			display: flex;
			justify-content: space-between;
		}

		.search {
			width: min(100%, 25rem);
		}

		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media only screen and (min-width: 1000px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media only screen and (min-width: 1300px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
