import { useEffect, useState } from 'react'

import {
  QueryOptions,
  QueryResult,
  fetchAllLabelsWithValues,
  performQuery,
} from '../api'

export default function (): JSX.Element {
  const [queryStartTime, setQueryStartTime] = useState<string>('')
  const [queryEndTime, setQueryEndTime] = useState<string>('')
  const [queryInterval, setQueryInterval] = useState<string>('200ms')
  const [queryMaxSamples, setQueryMaxSamples] = useState<string>('1000')
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [queries, setQueries] = useState<
    { query: string; options: QueryOptions }[]
  >([])
  const [labels, setLabels] = useState<Record<string, string[]> | null>(null)

  function fillQuery(query: string, options: QueryOptions) {
    setQuery(query)
    setQueryStartTime(options.from || '')
    setQueryEndTime(options.to || '')
    setQueryInterval(options.interval || '')
    setQueryMaxSamples(options.maxSamples ? options.maxSamples.toString() : '')
  }

  const renderedQueries = queries.map(({ query, options }) => (
    <tr className="cursor-pointer" onClick={() => fillQuery(query, options)}>
      <td>{query}</td>
      <td>{options.from}</td>
      <td>{options.to}</td>
      <td>{options.interval}</td>
      <td>{options.maxSamples}</td>
    </tr>
  ))

  useEffect(() => {
    fetchAllLabelsWithValues().then(setLabels).catch(console.error)
  }, [])

  async function handleQuery() {
    setLoading(true)
    const options: QueryOptions = {
      from: queryStartTime,
      to: queryEndTime,
      interval: queryInterval,
      maxSamples: Number(queryMaxSamples),
    }
    setQueries((old) => [...old, { query, options }])
    try {
      const result = await performQuery(query, options)
      setResult(result)
    } catch (error) {
      alert(error)
    }
    setLoading(false)
  }

  const resultCard = (
    <div className="card">
      <h2>Result</h2>
      <code className="block-code">{JSON.stringify(result, null, 2)}</code>
    </div>
  )

  return (
    <div>
      <h1>Query</h1>
      <div className="card">
        <h2>Query data</h2>
        <label>
          Query
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          From
          <input
            type="text"
            value={queryStartTime}
            onChange={(e) => setQueryStartTime(e.target.value)}
          />
        </label>
        <label>
          To
          <input
            type="text"
            value={queryEndTime}
            onChange={(e) => setQueryEndTime(e.target.value)}
          />
        </label>
        <label>
          Interval
          <input
            type="text"
            value={queryInterval}
            onChange={(e) => setQueryInterval(e.target.value)}
          />
        </label>
        <label>
          Max samples
          <input
            type="text"
            value={queryMaxSamples}
            onChange={(e) => setQueryMaxSamples(e.target.value)}
          />
        </label>
        <button disabled={loading} onClick={handleQuery} className="mt-2">
          Query
        </button>
      </div>
      <div className="card">
        <h2>Metrics and Labels</h2>
        {labels
          ? Object.entries(labels).map(([label, values]) => (
              <div>
                <h3>{label === '__name__' ? 'Metrics' : `Label '${label}'`}</h3>
                <div className="flex flex-row flex-wrap">
                  {values.map((value) => (
                    <code className="bg-slate-600 rounded-md p-2 m-2 text-sm">
                      {value}
                    </code>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="card">
        <h2>Recent Queries</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Query</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Interval</th>
              <th scope="col">Max samples</th>
            </tr>
          </thead>
          <tbody>{renderedQueries}</tbody>
        </table>
      </div>
      {result == null ? null : resultCard}
    </div>
  )
}
