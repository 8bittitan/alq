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

  private async request(data: Record<string, unknown>) {
    return await fetch(
      `https://${this.appId}.algolia.net/1/indexes/${this.indexName}`,
      {
        method: 'POST',
        headers: {
          'X-Algolia-API-Key': this.apiKey,
          'X-Algolia-Application-Id': this.appId,
        },
        body: JSON.stringify(data),
      },
    )
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err)
      })
  }

  public async saveObject(object: Record<string, unknown>) {
    return await this.request(object)
  }

  public async saveObjects() {
    // TODO: Implement
    throw new Error('Not implemented yet')
  }
}
