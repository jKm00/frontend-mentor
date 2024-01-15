import { json } from '@sveltejs/kit';
import data from './data.json';

export async function GET({ params }) {
	// TODO: Implement filters
	return json(data);
}
