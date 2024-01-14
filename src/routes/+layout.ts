import type { JobApplication } from '$lib/types';

export const ssr = false;

export const load = async ({ fetch }) => {
	async function fetchJobs() {
		try {
			const res = await fetch('/api/v1/job-applications');
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
