'use client'

import { Home, KeyRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '~/lib/utils'

export default function AppNav() {
  const path = usePathname()

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/app"
        className={cn(
          'flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary',
          {
            'bg-primary/10 text-primary font-semibold': path === '/app',
          },
        )}
      >
        <Home className="w-4 h-4" />
        Home
      </Link>
      <Link
        href="/app/apikeys"
        className={cn(
          'flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary',
          {
            'bg-primary/10 text-primary font-semibold': path === '/app/apikeys',
          },
        )}
      >
        <KeyRound className="w-4 h-4" />
        API Key
      </Link>
    </nav>
  )
}
