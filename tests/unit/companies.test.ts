import { describe, expect, it } from 'vitest';
import { GET } from '../../src/routes/api/v1/companies/+server';

describe('Companies', () => {
	it('Should return all companies', async () => {
		const result = await GET();
		const data = (await result.json()) as string[];

		expect(data.length).toBe(10);
	});
});
