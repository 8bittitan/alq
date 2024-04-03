'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthSchema } from '@alq/validators'

import { getSessionId } from '~/lib/api'
import { env } from '~/lib/env'

export async function register(data: FormData) {
  const body = AuthSchema.safeParse({
    username: data.get('username') ?? '',
    password: data.get('password') ?? '',
  })

  if (!body.success) {
    return {
      success: false,
      errors: body.error.flatten().fieldErrors,
    }
  }

  const resp = await fetch(`${env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(body.data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  if (resp.session?.id) {
    cookies().set({
      name: 'alq_session',
      value: resp.session.id,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    })

    return redirect('/app')
  }

  return resp
}

export async function login(data: FormData) {
  const body = AuthSchema.safeParse({
    username: data.get('username') ?? '',
    password: data.get('password') ?? '',
  })

  if (!body.success) {
    return {
      success: false,
      errors: body.error.flatten().fieldErrors,
    }
  }

  const resp = await fetch(`${env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(body.data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  if (resp.session?.id) {
    cookies().set({
      name: 'alq_session',
      value: resp.session.id,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    })

    return redirect('/app')
  }

  return resp
}

export async function logout() {
  const sessionId = getSessionId()

  const resp = await fetch(`${env.NEXT_PUBLIC_API_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionId}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  if (resp.success) {
    cookies().delete('alq_session')
    return redirect('/login')
  }

  return resp
}
