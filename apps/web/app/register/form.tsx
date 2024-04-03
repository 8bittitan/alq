'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthSchema } from '@alq/validators'

import * as actions from '~/actions/auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'

export default function RegisterForm() {
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
      const fData = new FormData()

      fData.set('username', data.username)
      fData.set('password', data.password)

      await actions.register(fData)
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
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
      </div>
      <Button type="submit" className="w-full">
        Sign up
      </Button>
    </form>
  )
}
