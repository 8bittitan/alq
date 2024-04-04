'use client'

import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'

export default function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={['light', 'dark']}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
