'use server'

import { UsernameSchema } from '@alq/validators'

import { getSessionId } from '~/lib/api'
import { env } from '~/lib/env'

export async function updateUsername(fData: FormData) {
  const data = UsernameSchema.safeParse({
    username: fData.get('username') ?? '',
  })

  if (!data.success) {
    return { success: false, error: data.error }
  }

  const sessionId = getSessionId()

  try {
    const resp = await fetch(`${env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionId}`,
      },
      body: JSON.stringify({ username: data.data.username }),
    }).then((res) => res.json())

    return resp
  } catch (err) {
    console.error(err)

    const error = err as unknown as Error

    return {
      error: error.message,
    }
  }
}
