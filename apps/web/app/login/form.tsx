'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthSchema } from '@alq/validators'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { env } from '~/lib/env'
import { cn } from '~/lib/utils'

export default function LoginForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await fetch(`${env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      if (user.user) {
        router.push('/app')
      }
    } catch (err) {
      console.error(err)
    }
  })

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label
          htmlFor="username"
          className={cn({
            'text-red-600': !!errors.username,
          })}
        >
          Email
        </Label>
        <Input
          id="username"
          type="email"
          placeholder="me@example.com"
          {...register('username', { required: 'Username is required' })}
          hasError={!!errors.username}
        />
        {errors.username && (
          <p className="-mt-2 text-sm text-red-600">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link href="#" className="inline-block ml-auto text-sm underline">
            Forgot your password?
          </Link>
        </div>
        <Input id="password" type="password" {...register('password')} />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}
