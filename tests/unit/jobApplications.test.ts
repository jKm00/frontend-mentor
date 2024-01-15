import { describe, expect, it } from 'vitest';
import { GET } from '../../src/routes/api/v1/job-applications/+server';
import type { JobApplication } from '$lib/types';

describe('Job Applications', () => {
	it('Should return all job applications', async () => {
		const result = await GET({ url: undefined });
		const data = (await result.json()) as JobApplication[];

		expect(data.length).toBe(10);
	});

	it('Should filter job applications by company', async () => {
		let queryString = 'company=Photosnap';
		let searchParams = new URLSearchParams(queryString);
		const result = await GET({ url: { searchParams } });
		const data = (await result.json()) as JobApplication[];

		queryString = 'company=Photosnap&company=Manage';
		searchParams = new URLSearchParams(queryString);
		const result2 = await GET({ url: { searchParams } });
		const data2 = (await result2.json()) as JobApplication[];

		expect(data.length).toBe(1);
		expect(data2.length).toBe(2);
	});

	it('Should filter job applications role', async () => {
		let queryString = 'role=Frontend';
		let searchParams = new URLSearchParams(queryString);
		const result = await GET({ url: { searchParams } });
		const data = (await result.json()) as JobApplication[];

		expect(data.length).toBe(6);
	});

	it('Should filter job applications based on language', async () => {
		let queryString = 'language=JavaScript';
		let searchParams = new URLSearchParams(queryString);
		const result = await GET({ url: { searchParams } });
		const data = (await result.json()) as JobApplication[];

		queryString = 'language=JavaScript&language=Ruby';
		searchParams = new URLSearchParams(queryString);
		const result2 = await GET({ url: { searchParams } });
		const data2 = (await result2.json()) as JobApplication[];

		expect(data.length).toBe(8);
		expect(data2.length).toBe(9);
	});

	it('Should filter job applications based on tooles', async () => {
		let queryString = 'tool=React';
		let searchParams = new URLSearchParams(queryString);
		const result = await GET({ url: { searchParams } });
		const data = (await result.json()) as JobApplication[];

		queryString = 'tool=React&tool=Sass';
		searchParams = new URLSearchParams(queryString);
		const result2 = await GET({ url: { searchParams } });
		const data2 = (await result2.json()) as JobApplication[];

		expect(data.length).toBe(3);
		expect(data2.length).toBe(6);
	});
});
