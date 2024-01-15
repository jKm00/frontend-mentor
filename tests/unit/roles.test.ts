import { describe, it, expect } from 'vitest';
import { GET } from '../../src/routes/api/v1/roles/+server';

describe('Roles', () => {
	it('Should return all roled', async () => {
		const result = await GET();
		const data = (await result.json()) as string[];

		expect(data.length).toBe(3);
	});
});
