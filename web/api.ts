export interface QueryResult {
  warnings: any
  result: Series[]
}

export type Point = [number, string]

export interface Series {
  metrics: Record<string, string>
  values: Point[]
}

export interface QueryOptions {
  from?: string
  to?: string
  interval?: string
  maxSamples?: number
}

export interface ErrorResponse {
  statusCode: number
  message: string
}

export async function performQuery(
  query: string,
  options?: QueryOptions
): Promise<QueryResult> {
  const response = await fetch('http://localhost:8080/api/v1/query/range', {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      from: options?.from,
      to: options?.to,
      interval: options?.interval,
      maxSamples: options?.maxSamples,
    }),
  })

  const body = await response.json()

  if (response.status !== 200) {
    const error = body as ErrorResponse
    throw new Error(error.message)
  }

  return body as QueryResult
}
