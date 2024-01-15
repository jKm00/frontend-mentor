<script lang="ts">
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	export let companies: string[] = [];
	export let roles: string[] = [];
	export let languages: string[] = [];
	export let tools: string[] = [];

	let showFilters = false;

	let selectedCompanies: string[] = [];
	let selectedRoles: string[] = [];
	let selectedLanguages: string[] = [];
	let selectedTools: string[] = [];

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
			languages.forEach((language) => params.append('languages', language));
		}
		if (tools.length > 0) {
			tools.forEach((tool) => params.append('tools', tool));
		}

		goto(`?${params.toString()}`);
	}
</script>

<div>
	<div class="flex gap-10">
		<h2 class="font-bold text-xl">Filters:</h2>
		<button
			on:click={() => (showFilters = !showFilters)}
			class="bg-accent rounded-full py-[0.125rem] px-4 text-xs text-accent-foreground outline outline-accent hover:bg-white hover:text-foreground transition-colors"
		>
			Hide/show
		</button>
	</div>
	{#if showFilters}
		<div transition:slide={{ duration: 400 }} class="flex flex-wrap gap-10 mt-4">
			<!-- Companies -->
			<div class="flex flex-col">
				<h3 class="font-bold">Companies:</h3>
				{#each companies as company}
					<label>
						<input type="checkbox" bind:group={selectedCompanies} value={company} />
						<span>{company}</span>
					</label>
				{/each}
			</div>
			<!-- Roles -->
			<div class="flex flex-col">
				<h3 class="font-bold">Roles:</h3>
				{#each roles as role}
					<label>
						<input type="checkbox" bind:group={selectedRoles} value={role} />
						<span>{role}</span>
					</label>
				{/each}
			</div>
			<!-- Languages -->
			<div class="flex flex-col">
				<h3 class="font-bold">Languages:</h3>
				{#each languages as language}
					<label>
						<input type="checkbox" bind:group={selectedLanguages} value={language} />
						<span>{language}</span>
					</label>
				{/each}
			</div>
			<!-- Tools -->
			<div class="flex flex-col">
				<h3 class="font-bold">Tools:</h3>
				{#each tools as tool}
					<label>
						<input type="checkbox" bind:group={selectedTools} value={tool} />
						<span>{tool}</span>
					</label>
				{/each}
			</div>
		</div>
	{/if}
</div>
