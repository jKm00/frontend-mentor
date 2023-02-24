<script lang="ts">
	import { onMount } from 'svelte';
	import API from '../../../services/api';
	import type { PageData } from './$types';

	export let data: any;

	$: country = data.country;
	$: countryAbbr = Object.values(country.name.nativeName)[0] as any;
	$: currency = Object.values(country.currencies)[0] as any;
	$: languages = Object.entries(country.languages).map((l: any) => {
		return l[1];
	});
	// Regex that adds commas on every thousand digit
	$: population = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	let borderCountries = [] as string[];

	onMount(() => {
		if (country.borders !== undefined) {
			country.borders.forEach(async (c: string) => {
				const fullName = await API.get(`/alpha/${c}`).then((res) => {
					return res[0].name.common;
				});
				borderCountries = [...borderCountries, fullName];
			});
		}
	});

	$: console.log(country);
</script>

<article>
	<img class="flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
	<div class="wrapper">
		<h2 class="title">{country.name.common}</h2>
		<section class="content">
			<div>
				<p class="stat">
					<span class="bold">Native Name:</span>
					{countryAbbr.common}
				</p>
				<p class="stat">
					<span class="bold">Population:</span>
					{population}
				</p>
				<p class="stat">
					<span class="bold">Region:</span>
					{country.region}
				</p>
				<p class="stat">
					<span class="bold">Sub Region:</span>
					{country.subregion}
				</p>
				{#if country.capital !== undefined}
					<p class="stat">
						<span class="bold">Capital:</span>
						{#each country.capital as capital}
							{capital}
						{/each}
					</p>
				{/if}
			</div>
			<div>
				<p class="stat">
					<span class="bold">Top Level Domain:</span>
					{country.tld}
				</p>
				<p class="stat">
					<span class="bold">Currencies:</span>
					{currency.name}
				</p>
				<p class="stat">
					<span class="bold">Languages:</span>
					{languages.join(', ')}
				</p>
			</div>
		</section>
		{#if borderCountries.length > 0}
			<section class="border-countries">
				<h3 class="title">Border Countries:</h3>
				<div class="flex">
					{#each borderCountries as borderCountry}
						<p class="card">{borderCountry}</p>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</article>

<style scoped>
	article {
		color: var(--clr-fg);
	}

	.flag {
		aspect-ratio: 16 / 9;
		object-fit: cover;
		margin-bottom: 2rem;
	}

	.title {
		margin-bottom: 1.5em;
	}

	.stat {
		margin-bottom: 0.75rem;
	}

	.bold {
		font-weight: 800;
	}

	.stat:last-of-type {
		margin-bottom: 3rem;
	}

	.card {
		background-color: var(--clr-el);
		padding: 0.25em 1em;
		box-shadow: 0 0 10px rgba(0 0 0 / 0.1);
		text-align: center;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media only screen and (min-width: 1300px) {
		article {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			align-items: center;
			gap: 5rem;
		}

		.flag {
			margin-bottom: 0;
		}

		.content {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		.border-countries {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.border-countries .title {
			margin-bottom: 0;
		}
	}
</style>
