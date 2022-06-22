import { useState } from 'react'
import {
  ChartLabel,
  Crosshair,
  HorizontalGridLines,
  LineSeries as Line,
  XYPlot,
  YAxis,
  makeWidthFlexible,
} from 'react-vis'
import type { LineSeriesPoint, RVNearestXEventHandler } from 'react-vis'

import { Series, performQuery } from '../api'
import '../graphs.css'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

type DataPoint = { x: number; y: number }

function convertSeriesToPoints(series: Series[]): DataPoint[] {
  return series[0].values.map(([x, b]) => ({ x, y: Number(b) }))
}

export default function (): JSX.Element {
  const [crosshairValues, setCrosshairValues] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)

  const [session, setSession] = useState<string>('')
  const [car, setCar] = useState<string>('')

  const [brake, setBrake] = useState<DataPoint[]>([])
  const [drs, setDRS] = useState<DataPoint[]>([])
  const [gears, setGears] = useState<DataPoint[]>([])
  const [speed, setSpeed] = useState<DataPoint[]>([])
  const [steering, setSteering] = useState<DataPoint[]>([])
  const [throttle, setThrottle] = useState<DataPoint[]>([])

  const mouseMove: RVNearestXEventHandler<LineSeriesPoint> = (point) => {
    setCrosshairValues([{ x: point.x, y: 0 }])
  }

  function mouseLeave() {
    setCrosshairValues([])
  }

  async function graph() {
    setLoading(true)
    try {
      const data = await performQuery(
        `brake{car="${car}",session="${session}"}`,
        {
          from: '1m',
          to: '2m',
          interval: '1s',
          maxSamples: 10000,
        }
      )
      setBrake(convertSeriesToPoints(data.result))
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    try {
      const data = await performQuery(
        `drs{car="${car}",session="${session}"}`,
        {
          from: '1m',
          to: '2m',
          interval: '1s',
          maxSamples: 10000,
        }
      )
      setDRS(convertSeriesToPoints(data.result))
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    try {
      const data = await performQuery(
        `gear{car="${car}",session="${session}"}`,
        {
          from: '1m',
          to: '2m',
          interval: '1s',
          maxSamples: 10000,
        }
      )
      setGears(convertSeriesToPoints(data.result))
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    try {
      const data = await performQuery(
        `speed{car="${car}",session="${session}"}`,
        {
          from: '1m',
          to: '2m',
          interval: '1s',
          maxSamples: 10000,
        }
      )
      setSpeed(convertSeriesToPoints(data.result))
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    try {
      const data = await performQuery(
        `steer{car="${car}",session="${session}"}`,
        {
          from: '1m',
          to: '2m',
          interval: '1s',
          maxSamples: 10000,
        }
      )
      setSteering(convertSeriesToPoints(data.result))
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    try {
      const data = await performQuery(
        `throttle{car="${car}",session="${session}"}`,
        {
          from: '1m',
          to: '2m',
          interval: '1s',
          maxSamples: 10000,
        }
      )
      setThrottle(convertSeriesToPoints(data.result))
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    setShowGraph(true)
    setLoading(false)
  }

  const renderedGraph = (
    <div className="card" onMouseLeave={mouseLeave}>
      <FlexibleXYPlot
        height={100}
        yDomain={[-1, 8]}
        margin={{ top: 5, bottom: 2, left: 0, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="Gears"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Line data={gears} curve="curveStep" onNearestX={mouseMove} />
        <Crosshair values={crosshairValues} />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={100}
        yDomain={[-1, 1]}
        margin={{ top: 5, bottom: 2, left: 0, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <HorizontalGridLines tickValues={[0]} />
        <ChartLabel
          text="Steering"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair values={crosshairValues} />
        <Line data={steering} curve="curveBasis" onNearestX={mouseMove} />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={50}
        yDomain={[0, 1]}
        margin={{ top: 5, bottom: 2, left: 0, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="DRS"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair values={crosshairValues} />
        <Line data={drs} curve="curveStep" onNearestX={mouseMove} />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={100}
        yDomain={[0, 1]}
        margin={{ top: 5, bottom: 2, left: 0, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="Throttle"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair values={crosshairValues} />
        <Line data={throttle} curve="curveBasis" onNearestX={mouseMove} />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={200}
        margin={{ top: 5, bottom: 2, left: 0, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="Speed"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair values={crosshairValues} />
        <Line data={speed} curve="curveBasis" onNearestX={mouseMove} />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={100}
        yDomain={[0, 1]}
        margin={{ top: 5, bottom: 2, left: 0, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="Brake"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair values={crosshairValues} />
        <Line data={brake} curve="curveBasis" onNearestX={mouseMove} />
      </FlexibleXYPlot>
    </div>
  )

  return (
    <div>
      <h1>Graph</h1>
      <div className="card">
        <h2>Configuration</h2>
        <label>
          Session
          <input
            type="text"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          />
        </label>
        <label>
          Car
          <input
            type="text"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          />
        </label>
        <button disabled={loading} onClick={graph} className="mt-2">
          Graph
        </button>
      </div>
      {showGraph ? renderedGraph : null}
    </div>
  )
}
