import ExplorerStats from '~/components/explorer-stats'
import Page from '~/components/page'
import { Button } from '~/components/ui/button'
import { getJobs } from '~/lib/api'

export default async function AppPage() {
  const { jobs } = await getJobs()

  return (
    <Page title="Explorer" emptyState={jobs.length === 0}>
      {jobs.length > 0 ? (
        <ExplorerStats initialJobs={jobs} />
      ) : (
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      )}
    </Page>
  )
}
