export interface QueryResult {
  warnings: any
  result: Series[]
}

export interface LabelsResult {
  warnings: any
  labels: string[]
}

export interface LabelValuesResult {
  warnings: any
  values: string[]
}

export interface Session {
  id: string
  type: string
  game: string
  track: string
}

export interface Car {
  id: string
  team: string
  driver: string
  player: string
  isAi?: boolean
  number?: number
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
  const response = await fetch('http://localhost:20777/api/v1/query/range', {
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

export async function fetchLabels(
  from: string,
  to: string
): Promise<LabelsResult> {
  const query = new URLSearchParams()
  query.set('from', from)
  query.set('to', to)
  const response = await fetch(
    `http://localhost:20777/api/v1/labels?${query.toString()}`,
    {
      method: 'GET',
    }
  )

  const body = await response.json()

  if (response.status !== 200) {
    const error = body as ErrorResponse
    throw new Error(error.message)
  }

  return body as LabelsResult
}

export async function fetchLabelValues(
  label: string,
  from: string,
  to: string
): Promise<LabelValuesResult> {
  const query = new URLSearchParams()
  query.set('from', from)
  query.set('to', to)
  const response = await fetch(
    `http://localhost:20777/api/v1/labels/${encodeURIComponent(
      label
    )}?${query.toString()}`,
    {
      method: 'GET',
    }
  )

  const body = await response.json()

  if (response.status !== 200) {
    const error = body as ErrorResponse
    throw new Error(error.message)
  }

  return body as LabelValuesResult
}

export async function fetchAllLabelsWithValues(): Promise<
  Record<string, string[]>
> {
  // As the time is not real world time, but session time, we know that it is unlikely
  // to ever surpass 2h
  const from = '0s'
  const to = '2h'

  const result: Record<string, string[]> = {}

  const labels = await fetchLabels(from, to)
  const values = await Promise.all(
    labels.labels.map((label) => fetchLabelValues(label, from, to))
  )

  for (let i = 0; i < labels.labels.length; i++) {
    result[labels.labels[i]] = values[i].values
  }

  return result
}

export async function fetchSessions(): Promise<Session[]> {
  const response = await fetch(`http://localhost:20777/api/v1/sessions`, {
    method: 'GET',
  })
  const body = await response.json()

  if (response.status !== 200) {
    const error = body as ErrorResponse
    throw new Error(error.message)
  }

  return body as Session[]
}

export async function fetchCars(session: string): Promise<Car[]> {
  const response = await fetch(
    `http://localhost:20777/api/v1/sessions/${encodeURIComponent(
      session
    )}/cars`,
    {
      method: 'GET',
    }
  )
  const body = await response.json()

  if (response.status !== 200) {
    const error = body as ErrorResponse
    throw new Error(error.message)
  }

  return body as Car[]
}

export function convertSeriesToPoints(
  series: Series[]
): Record<number, number> {
  if (!series || series.length === 0) {
    return {}
  }

  return series[0].values.reduce(
    (points, [x, y]) => ({ ...points, [x]: Number(y) }),
    {}
  )
}

window.api = {
  performQuery,
  fetchLabels,
  fetchLabelValues,
  fetchAllLabelsWithValues,
}
