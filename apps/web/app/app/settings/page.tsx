import Page from '~/components/page'
import { getUser } from '~/lib/api'

import DeleteAccount from './delete-account'
import UsernameForm from './username-form'

export default async function SettingsPage() {
  const user = await getUser()

  return (
    <Page title="Settings">
      <div className="flex flex-col gap-4">
        <UsernameForm user={user} />

        <DeleteAccount />
      </div>
    </Page>
  )
}
