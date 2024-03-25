import { ofetch as fetch, type FetchOptions } from 'ofetch'
import type { Job, Status } from '@alq/validators'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type AlgoliaResponse = {
  hits: Job[]
}

export class Algolia {
  private apiKey: string
  private appId: string
  private indexName: string

  constructor({
    apiKey,
    appId,
    indexName,
  }: {
    apiKey: string
    appId: string
    indexName: string
  }) {
    this.apiKey = apiKey
    this.appId = appId
    this.indexName = indexName
  }

  private async request<T>(
    endpoint: string,
    method: RequestMethod,
    data?: Record<string, unknown>,
  ): Promise<T> {
    const options: FetchOptions = {
      method,
      headers: {
        'X-Algolia-API-Key': this.apiKey,
        'X-Algolia-Application-Id': this.appId,
      },
      parseResponse: JSON.parse,
    }

    if (data) {
      options.body = data
    }

    return await fetch(
      `https://${this.appId}.algolia.net/1${endpoint}`,
      options,
    ).catch((err) => {
      throw new Error(err)
    })
  }

  public async saveObject(job: Job) {
    return await this.request(`/indexes/${this.indexName}`, 'POST', job)
  }

  public saveObjects() {
    // TODO: Implement
    throw new Error('Not implemented yet')
  }

  public async getObject() {
    return await this.request<AlgoliaResponse>(
      `/indexes/${this.indexName}?hitsPerPage=1&facetFilters=status:queued`,
      'GET',
    )
  }

  public async updateJobStatus(job: Job, newStatus: Status) {
    return await this.request(
      `/indexes/${this.indexName}/${job.objectID}`,
      'PUT',
      {
        ...job,
        status: newStatus,
      },
    )
  }

  public async updateJobRetries(job: Job) {
    return await this.request(
      `/indexes/${this.indexName}/${job.objectID}`,
      'PUT',
      {
        ...job,
        retries: job.retries - 1,
      },
    )
  }

  public async deleteJob(job: Job) {
    return await this.request(
      `/indexes/${this.indexName}/${job.objectID}`,
      'DELETE',
    )
  }
}
