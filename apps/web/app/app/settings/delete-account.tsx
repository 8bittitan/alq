'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function DeleteAccount() {
  const [confirmOk, setConfirmOk] = useState(false)
  const router = useRouter()

  const handleDeleteAccount = async () => {
    const resp = await fetch('/api/user', {
      method: 'DELETE',
    }).then((res) => res.json())

    if (resp.success) {
      router.push('/')
    }
  }

  return (
    <Dialog
      onOpenChange={() => {
        setConfirmOk(false)
      }}
    >
      <Card className="border-destructive border-spacing-2">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-4">
            Deleting your account is irreversible. Please be certain you know
            what you are doing.
          </p>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm account deletion</DialogTitle>
          <DialogDescription>
            This action can not be undone. Please type{' '}
            <span className="font-bold">confirm</span> to confirm.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm">Confirmation</Label>
              <Input
                id="confirm"
                onChange={(e) => {
                  setConfirmOk(e.target.value.toLowerCase() === 'confirm')
                }}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            disabled={!confirmOk}
            onClick={handleDeleteAccount}
          >
            Confirm deletion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
