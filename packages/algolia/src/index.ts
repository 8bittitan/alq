import { createFetchRequester } from '@algolia/requester-fetch'
import algoliasearch, { type SearchIndex } from 'algoliasearch'
import type { Job, Status } from '@alq/validators'

type AlgoliaResponse = {
  hits: Job[]
}

export class Algolia {
  private client: SearchIndex

  constructor({
    apiKey,
    appId,
    indexName,
  }: {
    apiKey: string
    appId: string
    indexName: string
  }) {
    const algolia = algoliasearch(appId, apiKey, {
      requester: createFetchRequester(),
    })

    this.client = algolia.initIndex(indexName)
  }

  public async queueJob(job: Job) {
    const { objectID } = await this.client.saveObject(
      {
        ...job,
        status: 'queued',
      },
      {
        autoGenerateObjectIDIfNotExist: true,
      },
    )

    return {
      ...job,
      objectID,
    }
  }

  public async queueJobs(jobs: Job[]) {
    const { objectIDs } = await this.client.saveObjects(jobs, {
      autoGenerateObjectIDIfNotExist: true,
    })

    return jobs.map((job, index) => ({
      ...job,
      objectID: objectIDs[index],
    }))
  }

  public async getJob(): Promise<AlgoliaResponse> {
    return await this.client.search<Job>('', {
      facetFilters: 'status:queued',
      hitsPerPage: 1,
    })
  }

  private async updateJob(updatedJob: Job) {
    return await this.client.saveObject(updatedJob)
  }

  public async updateJobStatus(job: Job, newStatus: Status) {
    const updatedJob = {
      ...job,
      status: newStatus,
    }

    await this.updateJob(updatedJob)

    return updatedJob
  }

  public async updateJobRetries(job: Job) {
    const updatedJob = {
      ...job,
      retries: job.retries - 1,
    }

    await this.updateJob(updatedJob)

    return updatedJob
  }

  public async deleteJob(job: Job) {
    await this.client.deleteObject(job.objectID!)
  }

  public async jobsByApiKey(apikey: string): Promise<Job[]> {
    const { hits } = await this.client.search<Job>(apikey)

    return hits
  }
}
