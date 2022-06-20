import { useState } from 'react'

export default function (): JSX.Element {
  const [queryStartTime, setQueryStartTime] = useState<number>(0)
  const [queryEndTime, setQueryEndTime] = useState<number>(0)
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  function performQuery() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <h1>Query</h1>
      <div className="card">
        <h2>Query data</h2>
        <label>
          Start time
          <input
            type="number"
            value={queryStartTime}
            onChange={(e) => setQueryStartTime(Number(e.target.value))}
          />
        </label>
        <label>
          End time
          <input
            type="number"
            value={queryEndTime}
            onChange={(e) => setQueryEndTime(Number(e.target.value))}
          />
        </label>
        <label>
          Query
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button disabled={loading} onClick={performQuery}>
          Query
        </button>
      </div>
      <div className="card">
        <h2>Result</h2>
        <code className="block">
          timestamp,data,foo 1,2,3 1,2,3 1,2,3 1,2,3
        </code>
      </div>
    </div>
  )
}
