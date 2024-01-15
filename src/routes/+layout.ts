export const load = async ({ fetch }) => {
	async function fetchCompanies() {
		try {
			const res = await fetch('/api/v1/companies');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchRoles() {
		try {
			const res = await fetch('/api/v1/roles');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchLanguages() {
		try {
			const res = await fetch('/api/v1/languages');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchTools() {
		try {
			const res = await fetch('/api/v1/tools');
			const data = (await res.json()) as string[];

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	// Fetch all data in parallel
	const [companies, roles, languages, tools] = await Promise.all([
		fetchCompanies(),
		fetchRoles(),
		fetchLanguages(),
		fetchTools()
	]);

	return {
		companies,
		roles,
		languages,
		tools
	};
};

export const ssr = false;
