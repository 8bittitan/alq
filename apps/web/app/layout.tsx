import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import AppThemeProvider from '~/components/theme-provider'
import ToasterWrapper from '~/components/toaster-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ALQ',
  description: 'Simple queue service backed by Algolia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppThemeProvider>
          {children}
          <ToasterWrapper />
        </AppThemeProvider>
      </body>
    </html>
  )
}
