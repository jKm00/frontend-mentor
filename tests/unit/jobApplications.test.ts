import { describe, expect, it } from 'vitest';
import { GET } from '../../src/routes/api/v1/job-applications/+server';
import type { JobApplication } from '$lib/types';

describe('Job Applications', () => {
	it('Should return all job applications', async () => {
		const result = await GET({ params: undefined });
		const data = (await result.json()) as JobApplication[];

		expect(data.length).toBe(10);
	});
});
