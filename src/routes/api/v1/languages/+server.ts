import { removeDuplicatess } from '$lib/utils/list';
import { json } from '@sveltejs/kit';
import data from '../data.json';

export async function GET() {
	return json(removeDuplicatess(data.map((d) => d.languages).flat()));
}
