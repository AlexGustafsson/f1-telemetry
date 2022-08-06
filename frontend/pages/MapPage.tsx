import { useEffect, useRef, useState } from 'react'

import {
  QueryOptions,
  convertSeriesToPoints,
  fetchLabelValues,
  performQuery,
} from '../api'
import Tip from '../controls/Tip'

function normalize(
  { x, y }: { x: number; y: number },
  min: { x: number; y: number },
  range: { x: number; y: number },
  canvas: HTMLCanvasElement
): { x: number; y: number } {
  return {
    x: ((x - min.x) / range.x) * canvas.width,
    y: ((y - min.y) / range.y) * canvas.height,
  }
}

export default function (): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [sessions, setSessions] = useState<string[]>([])

  const canvasElement = useRef<HTMLCanvasElement>(null)

  const [session, setSession] = useState<string>('')
  const [car, setCar] = useState<string>('')

  // Fetch available sessions
  useEffect(() => {
    // Assume every session has some data the first 10 minutes
    fetchLabelValues('session', '0s', '10m')
      .then((data) => {
        setSessions(data.values)
      })
      .catch(console.error)
  }, [])

  async function map() {
    setLoading(true)
    setShowMap(false)

    const options: QueryOptions = {
      from: '1m',
      to: '3m',
      interval: '1s',
      maxSamples: 10000,
    }

    const worldXResult = await performQuery(
      `world_x{car="${car}",session="${session}"}`,
      options
    )
    const worldX = convertSeriesToPoints(worldXResult.result)

    const worldYResult = await performQuery(
      `world_z{car="${car}",session="${session}"}`, // z is Y for our 2D use case
      options
    )
    const worldY = convertSeriesToPoints(worldYResult.result)

    const positions: Record<number, { x: number; y: number }> = {}
    for (const [key, x] of Object.entries(worldX)) {
      const time = Number(key)
      const y = worldY[time]
      if (typeof y !== 'undefined') {
        positions[time] = { x, y }
      }
    }

    const min = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER }
    const max = { x: -Number.MAX_SAFE_INTEGER, y: -Number.MAX_SAFE_INTEGER }

    for (const { x, y } of Object.values(positions)) {
      if (x < min.x) {
        min.x = x
      }

      if (y < min.y) {
        min.y = y
      }

      if (x > max.x) {
        max.x = x
      }

      if (y > max.y) {
        max.y = y
      }
    }

    const range = {
      x: max.x - min.x,
      y: max.y - min.y,
    }

    // TODO: Make it so we can keep the ratio
    const ratio = range.y / range.x

    const canvas = canvasElement.current
    if (!canvas) {
      // Race condition - rendered before canvas mounted to DOM
      console.error('canvas not yet mounted')
      setLoading(false)
      return
    }

    canvas.height = ratio * canvas.width

    const context = canvas.getContext('2d')
    if (!context) {
      // Will not happen - virtually all browsers support 2d contexts now a days
      console.error('unsupported browser - failed to get 2d context')
      setLoading(false)
      return
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.lineWidth = 2
    const p = Object.values(positions)
    for (let i = 1; i < p.length; i++) {
      const previous = normalize(p[i - 1], min, range, canvas)
      const current = normalize(p[i], min, range, canvas)
      context.beginPath()
      context.moveTo(previous.x, previous.y)
      context.lineTo(current.x, current.y)
      context.strokeStyle = `rgba(255, 0, 0, ${i / p.length})`
      context.stroke()
    }

    setLoading(false)
    setShowMap(true)
  }

  const renderedMap = (
    <canvas width="320" height="320" ref={canvasElement}></canvas>
  )

  const sessionOptions = sessions.map((x) => (
    <option key={x} value={x}>
      {x}
    </option>
  ))

  return (
    <div>
      <h1>Map</h1>
      <Tip uuid="tip.map-page.intro">
        <p>
          This page allows you to produce a map of cars' positions. To produce a
          map, simply specify a session and car. The values can be found in the
          queries page.
        </p>
      </Tip>
      <div className="card">
        <h2>Configuration</h2>
        <label>
          Session
          <input
            type="text"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            list="session"
          />
          <datalist id="session">{sessionOptions}</datalist>
        </label>
        <label>
          Car
          <input
            type="text"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          />
        </label>
        <button disabled={loading} onClick={map} className="mt-2">
          Map
        </button>
      </div>
      <div className="card">{renderedMap}</div>
    </div>
  )
}
