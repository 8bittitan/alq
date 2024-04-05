'use client'

import { Copy, MoreVertical, RotateCw } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { rollApiKey } from '~/actions/apikey'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { maskApiKey } from '~/lib/apikey'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'

export default function ApiKey({ apikey }: { apikey: string }) {
  const [rerollConfirmOk, setRerollConfirmOk] = useState(false)
  const [rerollConfirmDialogOpen, setRerollConfirmDialogOpen] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apikey)
    toast.success('API Key copied to clipboard')
  }

  const handleRerollApiKey = async () => {
    if (!rerollConfirmOk) return

    await rollApiKey()

    setRerollConfirmDialogOpen(false)

    toast.success('API Key has been rolled')
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-md bg-stone-100/50 text-secondary-foreground dark:bg-stone-900/75 px-4 h-16 flex items-center justify-between shadow">
        <span>{maskApiKey(apikey)}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRerollConfirmDialogOpen(true)}>
              <RotateCw className="h-4 w-4 mr-2" />
              Reroll
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog
        open={rerollConfirmDialogOpen}
        onOpenChange={(open) => setRerollConfirmDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription>This is a destructive action.</DialogDescription>
          </DialogHeader>
          <div>
            <p className="mb-4">
              Rerolling your API Key means any current requests using your
              current key will stop working. To make sure you understand this,
              please type the word <strong>confirm</strong> below before making
              this action.
            </p>
            <div className="max-w-56">
              <Input
                onChange={(e) =>
                  setRerollConfirmOk(
                    e.currentTarget.value.toLowerCase() === 'confirm',
                  )
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="destructive"
              disabled={!rerollConfirmOk}
              onClick={handleRerollApiKey}
            >
              Confirm reroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
