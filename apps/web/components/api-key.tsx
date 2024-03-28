'use client'

import { Copy, MoreVertical, RotateCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { maskApiKey } from '~/lib/apikey'

export default function ApiKey({ apikey }: { apikey: string }) {
  const router = useRouter()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apikey)
    toast.success('API Key copied to clipboard')
  }

  const handleRerollApiKey = async () => {
    await fetch('/api/apikeys', {
      method: 'PUT',
      credentials: 'include',
    }).then((res) => res.json())

    toast.success('API Key has been rolled')

    router.refresh()
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
            <DropdownMenuItem onClick={handleRerollApiKey}>
              <RotateCw className="h-4 w-4 mr-2" />
              Reroll
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}