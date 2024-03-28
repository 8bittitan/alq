import { PropsWithChildren } from 'react'

import { cn } from '~/lib/utils'

export default function Page({
  title,
  emptyState,
  children,
}: PropsWithChildren<{ title?: string; emptyState?: boolean }>) {
  return (
    <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      {title && (
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        </div>
      )}
      <div
        className={cn('flex-1', {
          'flex items-center justify-center border border-dashed rounded-lg shadow-sm':
            emptyState,
        })}
      >
        {children}
      </div>
    </main>
  )
}
