import { rollApiKey } from '~/lib/api'

export const PUT = async () => {
  const res = await rollApiKey()

  console.dir(res)

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
