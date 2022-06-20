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

import brake from '../data/brake.json'
import drs from '../data/drs.json'
import gears from '../data/gear.json'
import speed from '../data/speed.json'
import steering from '../data/steer.json'
import throttle from '../data/throttle.json'
import '../graphs.css'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

function convertToSeries(v: any): any {
  return v[0].values.map(([x, b]) => ({ x, y: Number(b) }))
}

const g = convertToSeries(gears)
const b = convertToSeries(brake)
const s = convertToSeries(steering)
const d = convertToSeries(drs)
const t = convertToSeries(throttle)
const sp = convertToSeries(speed)

export default function (): JSX.Element {
  const [crosshairValues, setCrosshairValues] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)

  const mouseMove: RVNearestXEventHandler<LineSeriesPoint> = (point) => {
    setCrosshairValues([{ x: point.x, y: 0 }])
  }

  function mouseLeave() {
    setCrosshairValues([])
  }

  function graph() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowGraph(true)
    }, 1000)
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
        <Line data={g} curve="curveStep" onNearestX={mouseMove} />
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
        <Line data={s} curve="curveBasis" onNearestX={mouseMove} />
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
        <Line data={d} curve="curveStep" onNearestX={mouseMove} />
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
        <Line data={t} curve="curveBasis" onNearestX={mouseMove} />
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
        <Line data={sp} curve="curveBasis" onNearestX={mouseMove} />
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
        <Line data={b} curve="curveBasis" onNearestX={mouseMove} />
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
          <input type="text" value="18273213" />
        </label>
        <label>
          Car
          <input type="text" value="12" />
        </label>
        <button disabled={loading} onClick={graph}>
          Graph
        </button>
      </div>
      {showGraph ? renderedGraph : null}
    </div>
  )
}
