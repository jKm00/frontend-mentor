/**
 * Returns a list without any duplicates
 * @param list the list to remove duplicates from
 * @returns a list without any duplicatess
 */
export function removeDuplicatess<T>(list: T[]) {
	return [...new Set(list)];
}
