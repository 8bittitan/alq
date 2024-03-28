import ApiKey from '~/components/api-key'
import Page from '~/components/page'
import { Button } from '~/components/ui/button'
import { getApiKeys } from '~/lib/api'

export default async function ApiKeysPage() {
  const data = await getApiKeys()

  return (
    <Page title="ApiKeys" emptyState={!data.apikey}>
      {data.apikey ? <ApiKey apikey={data.apikey} /> : <Empty />}
    </Page>
  )
}

function Empty() {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">
        You have no API keys
      </h3>
      <p className="text-sm text-muted-foreground">
        You can start using our API as soon as you create an API key.
      </p>
      <Button className="mt-4">Create API Key</Button>
    </div>
  )
}
