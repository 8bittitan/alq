import { Layers3 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import AppHeader from '~/components/app-header'
import AppNav from '~/components/app-nav'
import { CodeExampleProvider } from '~/components/code-provider'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { getUser } from '~/lib/api'
import { generateCodeExamples } from '~/lib/shiki'

export default async function AppLayout({ children }: PropsWithChildren) {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  const codeExamples = await generateCodeExamples(user)

  return (
    <CodeExampleProvider examples={codeExamples}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col h-full max-h-screen gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/app"
                className="flex items-center gap-2 font-semibold"
              >
                <Layers3 className="w-6 h-6" />
                <span className="">ALQ</span>
              </Link>
            </div>
            <div className="flex-1">
              <AppNav />
            </div>
            <div className="p-4 mt-auto">
              <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle className="text-lg">ALQ is Open Source</CardTitle>
                  <CardDescription>
                    This was built as a personal project and is open source.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full" asChild>
                    <a href="https://github.com/8bittitan/alq" target="_blank">
                      View repo
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <AppHeader username={user.username} codeExamples={codeExamples} />
          {children}
        </div>
      </div>
    </CodeExampleProvider>
  )
}
