import { cookies } from 'next/headers'

export async function getUser() {
  const cookie = cookies().get('auth_session')
  const sessionId = cookie?.value

  if (!sessionId) {
    return null
  }

  try {
    const res = await fetch('http://localhost:8787/v1/user', {
      credentials: 'include',
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
