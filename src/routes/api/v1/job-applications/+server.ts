import { json } from '@sveltejs/kit';
import data from '../data.json';

export async function GET({ url }) {
	if (!url) {
		return json(data);
	}

	let filteredData = data;

	// Filter by company
	let companies = url.searchParams.getAll('company');
	if (companies.length > 0) {
		companies = companies.map((company) => company.toLowerCase());
		filteredData = data.filter((job) => companies.includes(job.company.toLowerCase()));
	}

	// Filter by role
	let role = url.searchParams.get('role');
	if (role) {
		role = role.toLowerCase();
		filteredData = filteredData.filter((job) => job.role.toLowerCase() === role);
	}

	// Filter by languages
	let languages = url.searchParams.getAll('languages');
	if (languages.length > 0) {
		languages = languages.map((language) => language.toLowerCase());
		filteredData = filteredData.filter((job) => {
			const jobLanguages = job.languages.map((language) => language.toLowerCase());
			return jobLanguages.some((language) => languages.includes(language));
		});
	}

	// Filter by tools
	let tools = url.searchParams.getAll('tools');
	if (tools.length > 0) {
		tools = tools.map((tool) => tool.toLowerCase());
		filteredData = filteredData.filter((job) => {
			const jobTools = job.tools.map((tool) => tool.toLowerCase());
			return jobTools.some((tool) => tools.includes(tool));
		});
	}

	return json(filteredData);
}
