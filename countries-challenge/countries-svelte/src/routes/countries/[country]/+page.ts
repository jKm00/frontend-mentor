import API from "../../../services/api"
import type { PageLoad } from "./$types"

type OutputProps = { country: { country: any } }

export const load: PageLoad<OutputProps> = async ({ params }) => {
  const countries = await API.get(`/name/${params.country}`)

  return {
    country: countries[0]
  }
}