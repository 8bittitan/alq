'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
  const [formError, setFormError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    setFormError(null)
    try {
      const fData = new FormData()

      fData.set('username', data.username)
      fData.set('password', data.password)

      const resp = await actions.register(fData)

      if (resp?.error) {
        setFormError(resp.error)
      }
    } catch (err) {
      console.error(err)
      setFormError('Internal error, please try again.')
    } finally {
      setLoading(false)
    }
  })

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      {formError && (
        <div className="border border-red-500 p-4 rounded-lg">
          <p className="font-bold text-red-500">{formError}</p>
        </div>
      )}
      <div className="grid gap-2">
        <Label
          htmlFor="username"
          className={cn({
            'text-red-500': !!errors.username,
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
          <p className="-mt-2 text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="password"
          className={cn({ 'text-red-500': !!errors.password })}
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          hasError={!!errors.password}
        />
        {errors.password && (
          <p className="-mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        Sign up
      </Button>
    </form>
  )
}
