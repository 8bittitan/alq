import { config } from 'dotenv'
import { Algolia } from '@alq/algolia'

import { processJob } from '~/processJob'

config()

const WORKER_TIMEOUT = 4_000

const algolia = new Algolia({
  apiKey: process.env.ALGOLIA_ADMIN_API_KEY!,
  appId: process.env.ALGOLIA_APP_ID!,
  indexName: process.env.ALGOLIA_INDEX_NAME!,
})

async function work() {
  console.log('Worker is running')
  while (true) {
    const data = await algolia.getObject()

    const job = data.hits[0]

    if (!job) {
      console.log('No jobs found')
      await new Promise((resolve) => setTimeout(resolve, WORKER_TIMEOUT))
      continue
    }

    const processed = await processJob(job)

    if (processed) {
      await algolia.updateJobStatus(job, 'done')
      console.log(`Job ${job.objectID} processed successfully`)
    } else if (job.retries > 0) {
      await algolia.updateJobRetries(job)
    } else {
      await algolia.updateJobStatus(job, 'failed')
      console.log(`Job ${job.objectID} failed`)
    }

    await new Promise((resolve) => setTimeout(resolve, WORKER_TIMEOUT))
  }
}

work()
