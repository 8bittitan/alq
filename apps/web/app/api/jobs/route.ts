import { getJobs } from '~/lib/api'

export const GET = async () => {
  const { jobs } = await getJobs()

  return Response.json({ jobs })
}
