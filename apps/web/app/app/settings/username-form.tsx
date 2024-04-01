'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { UsernameSchema } from '@alq/validators'

import { updateUsername } from '~/actions/user'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function UsernameForm({ user }: { user: { username: string } }) {
  const { register, handleSubmit } = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
  })
  const [updating, setUpdating] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setUpdating(true)

      const fData = new FormData()

      fData.append('username', data.username)

      const resp = await updateUsername(fData)

      if (resp.success) {
        toast.success('Username updated')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(false)
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your username</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col max-w-sm gap-2" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="email"
              defaultValue={user.username}
              {...register('username', { required: true })}
            />
          </div>
          <Button type="submit" className="self-start" disabled={updating}>
            {updating ? (
              <span className="flex items-center gap-2">
                <Loader2Icon className="h-4 w-4 animate-spin" />
                <span>Updating...</span>
              </span>
            ) : (
              <span>Update</span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
