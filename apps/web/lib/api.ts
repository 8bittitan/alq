import { cookies } from 'next/headers'
import { z } from 'zod'
import { UsernameSchema } from '@alq/validators'

const getSessionId = () => {
  const cookie = cookies().get('auth_session')
  return cookie?.value ?? null
}

export async function getUser() {
  const sessionId = getSessionId()

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

export async function logout() {
  const sessionId = getSessionId()

  try {
    const res = await fetch('http://localhost:8787/v1/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    })
    const data = await res.json()

    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getApiKeys() {
  const sessionId = getSessionId()

  try {
    const res = await fetch('http://localhost:8787/v1/apikeys', {
      credentials: 'include',
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

export async function rollApiKey() {
  const sessionId = getSessionId()

  try {
    const res = await fetch('http://localhost:8787/v1/apikeys', {
      method: 'PUT',
      credentials: 'include',
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
    const res = await fetch('http://localhost:8787/v1/user', {
      method: 'PUT',
      credentials: 'include',
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
    const res = await fetch('http://localhost:8787/v1/user', {
      method: 'DELETE',
      credentials: 'include',
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
