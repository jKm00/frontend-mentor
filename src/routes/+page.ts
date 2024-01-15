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

	return {
		jobs: await fetchJobs()
	};
};
