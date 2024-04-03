'use server'

import { env } from 'process'
import { revalidatePath } from 'next/cache'

import { getSessionId } from '~/lib/api'

export async function rollApiKey() {
  const sessionId = getSessionId()

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/apikeys`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    }).then((res) => res.json())

    revalidatePath('/app/apikeys')

    return res
  } catch (err) {
    console.error(err)
    return null
  }
}
