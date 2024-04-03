import BlankQueues from '~/components/blank-queues'
import ExplorerStats from '~/components/explorer-stats'
import JobsTable from '~/components/job-table'
import Page from '~/components/page'
import { getJobs } from '~/lib/api'

export default async function AppPage() {
  const { jobs } = await getJobs()

  return (
    <Page title="Explorer" emptyState={jobs.length === 0}>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          <ExplorerStats initialJobs={jobs} />
          <JobsTable jobs={jobs} />
        </div>
      ) : (
        <BlankQueues />
      )}
    </Page>
  )
}
