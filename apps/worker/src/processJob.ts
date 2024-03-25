import { ofetch as fetch, type FetchOptions } from 'ofetch'
import type { Job } from '@alq/validators'

export const processJob = async (job: Job) => {
  console.log(`Processing job: ${job.objectID}`)

  try {
    const reqOptions: FetchOptions = {
      method: job.method,
    }

    if (job.payload && Object.keys(job.payload).length > 0) {
      reqOptions.body = JSON.stringify(job.payload)
    }

    await fetch(job.handler, reqOptions)

    return true
  } catch (err) {
    console.error(`Error processing job: ${job.objectID}`, err)

    return false
  }
}
