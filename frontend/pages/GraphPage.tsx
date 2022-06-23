import { useState } from 'react'
import {
  ChartLabel,
  Crosshair,
  HorizontalGridLines,
  LineSeries as Line,
  XAxis,
  XYPlot,
  YAxis,
  makeWidthFlexible,
} from 'react-vis'
import type { LineSeriesPoint, RVNearestXEventHandler } from 'react-vis'

import { QueryOptions, Series, performQuery } from '../api'
import '../graphs.css'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

function convertSeriesToPoints(series: Series[]): Record<number, number> {
  console.log(series[0].values[0])
  return series[0].values.reduce(
    (points, [x, y]) => ({ ...points, [x]: Number(y) }),
    {}
  )
}

async function findSectors(
  car: string,
  session: string,
  options?: QueryOptions
): Promise<Record<number, number>> {
  const data = await performQuery(
    `changes(sector{car="${car}",session="${session}"}[1s]) * (sector{car="${car}",session="${session}"} + 1) != 0`,
    {
      ...options,
      interval: '1s',
      maxSamples: 10000,
    }
  )

  return data.result[0].values
    .filter(([_, y]) => y !== '0')
    .reduce<Record<string, number>>(
      (sectors, [x, y]) => ({ ...sectors, [x]: Number(y) }),
      {}
    )
}

async function findLaps(car: string, session: string, options?: QueryOptions) {
  const data = await performQuery(
    `changes(lap{car="${car}",session="${session}"}[1s]) * lap{car="${car}",session="${session}"} != 0`,
    {
      ...options,
      interval: '1s',
      maxSamples: 10000,
    }
  )

  return data.result[0].values
    .filter(([_, y]) => y !== '0')
    .reduce<Record<string, number>>(
      (sectors, [x, y]) => ({ ...sectors, [x]: Number(y) }),
      {}
    )
}

export default function (): JSX.Element {
  const [crosshairX, setCrosshairX] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)

  const [session, setSession] = useState<string>('')
  const [car, setCar] = useState<string>('')

  const [brake, setBrake] = useState<Record<number, number>>({})
  const [drs, setDRS] = useState<Record<number, number>>({})
  const [gears, setGears] = useState<Record<number, number>>({})
  const [speed, setSpeed] = useState<Record<number, number>>({})
  const [steering, setSteering] = useState<Record<number, number>>({})
  const [throttle, setThrottle] = useState<Record<number, number>>({})

  const [sectors, setSectors] = useState<Record<number, number>>({})
  const [laps, setLaps] = useState<Record<number, number>>({})

  const mouseMove: RVNearestXEventHandler<LineSeriesPoint> = (point) => {
    setCrosshairX(point.x)
  }

  function mouseLeave() {
    setCrosshairX(-1)
  }

  async function graph() {
    setLoading(true)

    const options: QueryOptions = {
      from: '1m',
      to: '4m',
      interval: '1s',
      maxSamples: 10000,
    }

    try {
      const sectors = await findSectors(car, session, options)
      const laps = await findLaps(car, session, options)
      setSectors(sectors)
      setLaps(laps)

      const brakeData = await performQuery(
        `brake{car="${car}",session="${session}"}`,
        options
      )
      setBrake(convertSeriesToPoints(brakeData.result))

      const drsData = await performQuery(
        `drs{car="${car}",session="${session}"}`,
        options
      )
      setDRS(convertSeriesToPoints(drsData.result))

      const gearData = await performQuery(
        `gear{car="${car}",session="${session}"}`,
        options
      )
      setGears(convertSeriesToPoints(gearData.result))

      const speedData = await performQuery(
        `speed{car="${car}",session="${session}"}`,
        options
      )
      setSpeed(convertSeriesToPoints(speedData.result))

      const steerData = await performQuery(
        `steer{car="${car}",session="${session}"} * -1`, // it makes sense to have left on the top if you look at the graph, otherswise -1 (left) would be at the bottom
        options
      )
      setSteering(convertSeriesToPoints(steerData.result))

      const throttleData = await performQuery(
        `throttle{car="${car}",session="${session}"}`,
        options
      )
      setThrottle(convertSeriesToPoints(throttleData.result))
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    setShowGraph(true)
    setLoading(false)
  }

  function formatTick(x: number): JSX.Element {
    return (
      <tspan>
        {sectors[x] ? <tspan x="0">sector {sectors[x]}</tspan> : null}
        {laps[x] ? (
          <tspan x="0" dy="15">
            lap {laps[x]}
          </tspan>
        ) : null}
      </tspan>
    )
  }

  const renderedGraph = (
    <div className="card" onMouseLeave={mouseLeave}>
      <FlexibleXYPlot
        height={120}
        yDomain={[-1, 8]}
        margin={{ top: 10, bottom: 10, left: 60, right: 0 }}
      >
        <YAxis
          tickValues={[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]}
          tickFormat={(v) =>
            ['R', 'N', '1', '2', '3', '4', '5', '6', '7', '8'][v + 1]
          }
        />
        <HorizontalGridLines tickValues={[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]} />
        <ChartLabel
          text="Gear"
          includeMargin={false}
          xPercent={0}
          yPercent={0.5}
        />
        <Line
          data={Object.entries(gears).map(([x, y]) => ({ x: Number(x), y }))}
          curve="curveStep"
          onNearestX={mouseMove}
        />
        <Crosshair
          values={[{ x: crosshairX, y: 0 }]}
          itemsFormat={() => [
            {
              title: 'gear',
              value:
                typeof gears[crosshairX] === 'undefined'
                  ? 'unknown'
                  : ['R', 'N', '1', '2', '3', '4', '5', '6', '7', '8'][
                      gears[crosshairX] + 1
                    ],
            },
          ]}
          titleFormat={() => ({ title: 'time', value: crosshairX })}
        />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={100}
        yDomain={[-1, 1]}
        margin={{ top: 10, bottom: 10, left: 60, right: 0 }}
      >
        <YAxis
          tickValues={[-1, 0, 1]}
          tickFormat={(v) => ['right', 'straight', 'left'][v + 1]}
        />
        <HorizontalGridLines tickValues={[0]} />
        <ChartLabel
          text="Steering"
          includeMargin={false}
          xPercent={0}
          yPercent={0.5}
        />
        <Crosshair
          values={[{ x: crosshairX, y: 0 }]}
          itemsFormat={() => [
            {
              title: 'steer',
              value: (() => {
                if (typeof steering[crosshairX] === 'undefined') {
                  return 'unknown'
                }

                if (steering[crosshairX] < 0) {
                  return `${Math.round(-steering[crosshairX] * 180)}° right`
                }
                if (steering[crosshairX] === 0) {
                  return `straight`
                }
                return `${Math.round(steering[crosshairX] * 180)}° left`
              })(),
            },
          ]}
          titleFormat={() => ({ title: 'time', value: crosshairX })}
        />
        <Line
          data={Object.entries(steering).map(([x, y]) => ({ x: Number(x), y }))}
          curve="curveBasis"
          onNearestX={mouseMove}
        />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={50}
        yDomain={[0, 1]}
        margin={{ top: 10, bottom: 10, left: 60, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="DRS"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <YAxis
          tickValues={[0, 1]}
          tickFormat={(v) => (v == 1 ? 'on' : 'off')}
        />
        <Crosshair
          values={[{ x: crosshairX, y: 0 }]}
          itemsFormat={() => [
            {
              title: 'drs',
              value:
                typeof drs[crosshairX] === 'undefined'
                  ? 'unkown'
                  : drs[crosshairX] === 1
                  ? 'on'
                  : 'off',
            },
          ]}
          titleFormat={() => ({ title: 'time', value: crosshairX })}
        />
        <Line
          data={Object.entries(drs).map(([x, y]) => ({ x: Number(x), y }))}
          curve="curveStep"
          onNearestX={mouseMove}
        />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={100}
        yDomain={[0, 1]}
        margin={{ top: 10, bottom: 10, left: 60, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="Throttle"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair
          values={[{ x: crosshairX, y: 0 }]}
          itemsFormat={() => [
            {
              title: 'throttle',
              value:
                typeof throttle[crosshairX] === 'undefined'
                  ? 'unknown'
                  : `${Math.round(throttle[crosshairX] * 100)}%`,
            },
          ]}
          titleFormat={() => ({ title: 'time', value: crosshairX })}
        />
        <Line
          data={Object.entries(throttle).map(([x, y]) => ({ x: Number(x), y }))}
          curve="curveBasis"
          onNearestX={mouseMove}
        />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={200}
        margin={{ top: 10, bottom: 10, left: 60, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <ChartLabel
          text="Speed"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair
          values={[{ x: crosshairX, y: 0 }]}
          itemsFormat={() => [
            {
              title: 'speed',
              value:
                typeof speed[crosshairX] === 'undefined'
                  ? 'unknown'
                  : `${speed[crosshairX]}km/h`,
            },
          ]}
          titleFormat={() => ({ title: 'time', value: crosshairX })}
        />
        <Line
          data={Object.entries(speed).map(([x, y]) => ({ x: Number(x), y }))}
          curve="curveBasis"
          onNearestX={mouseMove}
        />
      </FlexibleXYPlot>
      <FlexibleXYPlot
        height={100}
        yDomain={[0, 1]}
        margin={{ top: 5, bottom: 60, left: 60, right: 0 }}
      >
        <YAxis hideTicks={true} />
        <XAxis
          hideLine
          tickValues={[...Object.keys(sectors), ...Object.keys(laps)]}
          tickFormat={(x) => formatTick(x) as unknown as string} // types are wrong
        />
        <ChartLabel
          text="Brake"
          includeMargin={false}
          xPercent={0}
          yPercent={1}
        />
        <Crosshair
          values={[{ x: crosshairX, y: 0 }]}
          itemsFormat={() => [
            {
              title: 'brake',
              value:
                typeof brake[crosshairX] === 'undefined'
                  ? 'unknown'
                  : `${Math.round(brake[crosshairX] * 100)}%`,
            },
          ]}
          titleFormat={() => ({ title: 'time', value: crosshairX })}
        />
        <Line
          data={Object.entries(brake).map(([x, y]) => ({ x: Number(x), y }))}
          curve="curveBasis"
          onNearestX={mouseMove}
        />
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
