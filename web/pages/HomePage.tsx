import { useState } from 'react'

import { getServerStatus, greet, startServer } from '../api'

export default function (): JSX.Element {
  const [collectingLoading, setCollectingLoading] = useState<boolean>(false)
  const [collecting, setCollecting] = useState<boolean>(false)

  function toggleCollecting() {
    if (collecting) {
      setCollectingLoading(true)
      // getServerStatus()
      // startServer()
      // setTimeout(() => {
      //   setCollectingLoading(false)
      //   setCollecting(false)
      // }, 1000)
    } else {
      setCollectingLoading(true)
      // greet()
      // getServerStatus().then(console.log).catch(console.error)
      startServer().then(console.log).catch(console.error)
      // setTimeout(() => {
      //   setCollectingLoading(false)
      //   setCollecting(true)
      // }, 1000)
    }
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
    </div>
  )
}
