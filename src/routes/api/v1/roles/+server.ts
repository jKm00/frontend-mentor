import { json } from '@sveltejs/kit';
import data from '../data.json';
import { removeDuplicatess } from '$lib/utils/list';

export async function GET() {
	return json(removeDuplicatess(data.map((d) => d.role)));
}
