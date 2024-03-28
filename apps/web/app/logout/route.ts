import { logout } from '~/lib/api'

export const POST = async () => {
  const data = await logout()

  return new Response(JSON.stringify(data), {
    status: data.success ? 200 : 400,
  })
}
