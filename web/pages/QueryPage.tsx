import { useState } from 'react'

import { QueryOptions, QueryResult, performQuery } from '../api'

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
      <code className="block">{JSON.stringify(result, null, 2)}</code>
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
        <button disabled={loading} onClick={handleQuery}>
          Query
        </button>
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
