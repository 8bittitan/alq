import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { getUser } from '~/lib/api'

export default async function AppLayout({ children }: PropsWithChildren) {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  return <div>{children}</div>
}
