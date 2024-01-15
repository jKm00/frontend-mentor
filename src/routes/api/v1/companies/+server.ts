import { json } from '@sveltejs/kit';
import data from '../data.json';

export async function GET() {
	return json(data.map((d) => d.company));
}
