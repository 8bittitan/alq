import { UsernameSchema } from '@alq/validators'

import { deleteAccount, updateUsername } from '~/lib/api'

export const PUT = async (req: Request) => {
  const body = await req.json()

  const data = UsernameSchema.parse(body)

  const res = await updateUsername(data)

  return Response.json(res)
}

export const DELETE = async () => {
  const res = await deleteAccount()

  return Response.json(res)
}
