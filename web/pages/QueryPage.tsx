import { useState } from 'react'

import { QueryResult, performQuery } from '../api'

export default function (): JSX.Element {
  const [queryStartTime, setQueryStartTime] = useState<string>('')
  const [queryEndTime, setQueryEndTime] = useState<string>('')
  const [queryInterval, setQueryInterval] = useState<string>('200ms')
  const [queryMaxSamples, setQueryMaxSamples] = useState<string>('1000')
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<QueryResult | null>(null)

  async function handleQuery() {
    setLoading(true)
    try {
      const result = await performQuery(query, {
        from: queryStartTime,
        to: queryEndTime,
        interval: queryInterval,
        maxSamples: Number(queryMaxSamples),
      })
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
      {result == null ? null : resultCard}
    </div>
  )
}
