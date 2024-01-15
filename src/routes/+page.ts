import type { JobApplication } from '$lib/types';

export const load = async ({ fetch, url }) => {
	async function fetchJobs() {
		try {
			const res = await fetch(`/api/v1/job-applications${url.search}`);
			const data = (await res.json()) as JobApplication[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchCompanies() {
		try {
			const res = await fetch('/api/v1/companies');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchRoles() {
		try {
			const res = await fetch('/api/v1/roles');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchLanguages() {
		try {
			const res = await fetch('/api/v1/languages');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchTools() {
		try {
			const res = await fetch('/api/v1/tools');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	return {
		jobs: await fetchJobs(),
		companies: await fetchCompanies(),
		roles: await fetchRoles(),
		languages: await fetchLanguages(),
		tools: await fetchTools()
	};
};
