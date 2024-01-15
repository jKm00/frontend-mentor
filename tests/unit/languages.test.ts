import { describe, it, expect } from 'vitest';
import { GET } from '../../src/routes/api/v1/languages/+server';

describe('Languages', () => {
	it('Should return all languages', async () => {
		const result = await GET();
		const data = (await result.json()) as string[];

		expect(data.length).toBe(5);
	});
});
