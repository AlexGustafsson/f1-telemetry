import { useEffect, useState } from 'react'

import { invoke } from '@tauri-apps/api'

export default function (): JSX.Element {
  const [collectingLoading, setCollectingLoading] = useState<boolean>(false)
  const [collecting, setCollecting] = useState<boolean>(false)

  const [queryStartTime, setQueryStartTime] = useState<number>(0)
  const [queryEndTime, setQueryEndTime] = useState<number>(0)
  const [query, setQuery] = useState<string>('')
  const [querying, setQuerying] = useState<boolean>(false)

  function toggleCollecting() {
    if (collecting) {
      setCollectingLoading(true)
      setTimeout(() => {
        setCollectingLoading(false)
        setCollecting(false)
      }, 1000)
    } else {
      setCollectingLoading(true)
      setTimeout(() => {
        setCollectingLoading(false)
        setCollecting(true)
      }, 1000)
    }
  }

  function performQuery() {
    setQuerying(true)
    setTimeout(() => {
      setQuerying(false)
    }, 1000)
  }

  return (
    <div>
      <h1>Home</h1>
      <div className="card">
        <h2>Data collection</h2>
        <button disabled={collectingLoading} onClick={toggleCollecting}>
          {collecting ? 'Stop Collecting' : 'Collect Data'}
        </button>
      </div>
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
        <button disabled={querying} onClick={performQuery}>
          Query
        </button>

        <div className="card">
          <code>timestamp,data,foo 1,2,3 1,2,3 1,2,3 1,2,3</code>
        </div>
      </div>
    </div>
  )
}
