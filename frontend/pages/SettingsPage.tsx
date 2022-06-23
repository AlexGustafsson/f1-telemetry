import { useEffect, useState } from 'react'

import { invoke } from '@tauri-apps/api'

export default function (): JSX.Element {
  const [address, setAddress] = useState<string>('127.0.0.1')
  const [port, setPort] = useState<string>('20777')
  const [loading, setLoading] = useState<boolean>(false)

  function save() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <h1>Settings</h1>
      <div className="card">
        <h2>UDP Telemetry</h2>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Port
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </label>
        <button disabled={loading} onClick={save} className="mt-2">
          Save
        </button>
      </div>
    </div>
  )
}
