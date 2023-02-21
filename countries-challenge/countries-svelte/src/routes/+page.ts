import API from "../services/api";
import type { PageLoad } from "./$types";

type OutputProps = { countries: unknown };

export const load: PageLoad<OutputProps> = async () => {
  let countries = await API.get('/all')

  return {
    countries: countries
  }
}