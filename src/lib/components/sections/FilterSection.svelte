<script lang="ts">
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';

	export let companies: string[] = [];
	export let roles: string[] = [];
	export let languages: string[] = [];
	export let tools: string[] = [];

	let showFilters = false;

	let selectedCompanies: string[] = $page.url.searchParams.getAll('company');
	let selectedRoles: string[] = $page.url.searchParams.getAll('role');
	let selectedLanguages: string[] = $page.url.searchParams.getAll('languages');
	let selectedTools: string[] = $page.url.searchParams.getAll('tools');

	$: numberOfAppliedFilters =
		selectedCompanies.length +
		selectedRoles.length +
		selectedLanguages.length +
		selectedTools.length;

	$: updateUrl(selectedCompanies, selectedRoles, selectedLanguages, selectedTools);

	function updateUrl(companies: string[], roles: string[], languages: string[], tools: string[]) {
		const params = new URLSearchParams();

		if (companies.length > 0) {
			companies.forEach((company) => params.append('company', company));
		}
		if (roles.length > 0) {
			roles.forEach((role) => params.append('role', role));
		}
		if (languages.length > 0) {
			languages.forEach((language) => params.append('language', language));
		}
		if (tools.length > 0) {
			tools.forEach((tool) => params.append('tool', tool));
		}

		goto(`?${params.toString()}`);
	}

	function clearAllFilters() {
		selectedCompanies = [];
		selectedRoles = [];
		selectedLanguages = [];
		selectedTools = [];
	}
</script>

<div class="flex gap-4 -translate-y-[30px]">
	<!-- Filters -->
	<div class="flex-grow bg-card shadow-lg rounded">
		<button
			on:click={() => (showFilters = !showFilters)}
			class="flex justify-between items-center w-full p-4"
		>
			<h2 class="font-bold text-lg">Filters: ({numberOfAppliedFilters})</h2>
			<img
				src="/icons/chevron-down.svg"
				alt="Down arrow"
				class={`${showFilters ? '' : '-rotate-90'} transition-transform`}
			/>
		</button>
		{#if showFilters}
			<div transition:slide={{ duration: 400 }} class="flex flex-col p-4 pt-0">
				<span class="block w-full h-[1px] bg-gray-300 mb-4"></span>
				<div class="flex gap-10">
					<!-- Companies -->
					<div class="flex flex-col">
						<h3 class="font-bold">Companies:</h3>
						{#each companies as company}
							<label>
								<input type="checkbox" bind:group={selectedCompanies} value={company} />
								{company}
							</label>
						{/each}
					</div>
					<!-- Roles -->
					<div class="flex flex-col">
						<h3 class="font-bold">Roles:</h3>
						{#each roles as role}
							<label>
								<input type="checkbox" bind:group={selectedRoles} value={role} />
								{role}
							</label>
						{/each}
					</div>
					<!-- Languages -->
					<div class="flex flex-col">
						<h3 class="font-bold">Languages:</h3>
						{#each languages as language}
							<label>
								<input type="checkbox" bind:group={selectedLanguages} value={language} />
								{language}
							</label>
						{/each}
					</div>
					<!-- Tools -->
					<div class="flex flex-col">
						<h3 class="font-bold">Tools:</h3>
						{#each tools as tool}
							<label>
								<input type="checkbox" bind:group={selectedTools} value={tool} />
								{tool}
							</label>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
	<!-- Clear button -->
	<button
		on:click={clearAllFilters}
		class="text-sm font-bold text-accent underline p-5 bg-card rounded shadow-lg self-start"
	>
		Clear
	</button>
</div>
