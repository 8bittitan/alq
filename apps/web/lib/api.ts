import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Job, UsernameSchema } from '@alq/validators'

import { env } from '~/lib/env'

export const getSessionId = () => {
  const cookie = cookies().get('alq_session')
  return cookie?.value ?? null
}

export async function getUser() {
  const sessionId = getSessionId()

  if (!sessionId) {
    return null
  }

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    })
    const data = await res.json()

    return data.user
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getApiKeys() {
  const sessionId = getSessionId()

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/apikeys`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    }).then((res) => res.json())

    return res
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function updateUsername({
  username,
}: z.infer<typeof UsernameSchema>) {
  const sessionId = getSessionId()

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionId}`,
      },
      body: JSON.stringify({ username }),
    }).then((res) => res.json())

    return res
  } catch (err) {
    console.error(err)
    return {
      success: false,
    }
  }
}

export async function deleteAccount() {
  const sessionId = getSessionId()

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    }).then((res) => res.json())

    return res
  } catch (err) {
    console.error(err)
    return {
      success: false,
    }
  }
}

export async function getJobs(): Promise<{ jobs: Job[] }> {
  const sessionId = getSessionId()

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/jobs`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    }).then((res) => res.json())

    return res
  } catch (err) {
    return {
      jobs: [],
    }
  }
}
