import { useEffect, useState } from 'react'
import type { LineSeriesPoint, RVNearestXEventHandler } from 'react-vis'
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

import {
  Car,
  QueryOptions,
  Session,
  convertSeriesToPoints,
  fetchCars,
  fetchSessions,
  performQuery,
} from '../api'
import Tip from '../controls/Tip'
import '../graphs.css'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

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

  if (!data || !data.result || data.result.length === 0) {
    return {}
  }

  return data.result[0].values
    .filter(([_, y]) => y !== '0')
    .reduce<Record<string, number>>(
      (sectors, [x, y]) => ({ ...sectors, [x]: Number(y) }),
      {}
    )
}

async function findLaps(
  car: string,
  session: string,
  options?: QueryOptions
): Record<string, number> {
  const data = await performQuery(
    `changes(lap{car="${car}",session="${session}"}[1s]) * lap{car="${car}",session="${session}"} != 0`,
    {
      ...options,
      interval: '1s',
      maxSamples: 10000,
    }
  )

  if (!data || !data.result || data.result.length === 0) {
    return {}
  }

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
  const [sessions, setSessions] = useState<Session[]>([])
  const [cars, setCars] = useState<Car[]>([])

  const [session, setSession] = useState<string>('')
  const [car, setCar] = useState<string>('')
  const [car2, setCar2] = useState<string>('')
  const [car2Offset, setCar2Offset] = useState<number>(0)

  const [brake, setBrake] = useState<Record<number, number>>({})
  const [drs, setDRS] = useState<Record<number, number>>({})
  const [gears, setGears] = useState<Record<number, number>>({})
  const [speed, setSpeed] = useState<Record<number, number>>({})
  const [steering, setSteering] = useState<Record<number, number>>({})
  const [throttle, setThrottle] = useState<Record<number, number>>({})

  const [brake2, setBrake2] = useState<Record<number, number> | undefined>()
  const [drs2, setDRS2] = useState<Record<number, number> | undefined>()
  const [gears2, setGears2] = useState<Record<number, number> | undefined>()
  const [speed2, setSpeed2] = useState<Record<number, number> | undefined>()
  const [steering2, setSteering2] = useState<
    Record<number, number> | undefined
  >()
  const [throttle2, setThrottle2] = useState<
    Record<number, number> | undefined
  >()

  const [sectors, setSectors] = useState<Record<number, number>>({})
  const [laps, setLaps] = useState<Record<number, number>>({})

  const [window, setWindow] = useState<[number, number]>([0, 240])

  const [options, setOptions] = useState<QueryOptions>({
    from: `${window[0]}s`,
    to: `${window[1]}s`,
    interval: '1s',
    maxSamples: 10000,
  })

  useEffect(() => {
    setOptions((options) => ({
      ...options,
      from: `${window[0]}s`,
      to: `${window[1]}s`,
    }))
  }, window)

  const mouseMove: RVNearestXEventHandler<LineSeriesPoint> = (point) => {
    setCrosshairX(point.x)
  }

  function mouseLeave() {
    setCrosshairX(-1)
  }

  // Fetch available sessions
  useEffect(() => {
    fetchSessions()
      .then((sessions) => {
        setSessions(sessions)
      })
      .catch(console.error)
  }, [])

  // Fetch available cars
  useEffect(() => {
    if (session == '') {
      setCars([])
      return
    }

    fetchCars(session)
      .then((cars) => {
        setCars(cars)
      })
      .catch(console.error)
  }, [session])

  // TODO: How the second car is a bit wonky. When the offset is changed, there seems to be a misalignment in data.
  // The data is cut off and it's hard to know exactly how to align the series. Is it possible to identify when the sector is changed
  // and automatically align? Or identify what lap they're on? We want it to work for qualifying as well...
  // Perhaps we even want it to work for laps of the same car in the same session.
  async function graph() {
    setLoading(true)

    try {
      const sectors = await findSectors(car, session, options)
      const laps = await findLaps(car, session, options)
      setSectors(sectors)
      setLaps(laps)

      const options2 = {
        ...options,
        from: `${window[0] + car2Offset}s`,
        to: `${window[1] + car2Offset}s`,
      }

      const brakeData = await performQuery(
        `brake{car="${car}",session="${session}"}`,
        options
      )
      setBrake(convertSeriesToPoints(brakeData.result))

      if (car2 != '') {
        const brakeData = await performQuery(
          `brake{car="${car2}",session="${session}"}`,
          options2
        )
        setBrake2(convertSeriesToPoints(brakeData.result))
      } else {
        setBrake2({})
      }

      const drsData = await performQuery(
        `drs{car="${car}",session="${session}"}`,
        options
      )
      setDRS(convertSeriesToPoints(drsData.result))

      if (car2 != '') {
        const drsData = await performQuery(
          `drs{car="${car2}",session="${session}"}`,
          options2
        )
        setDRS2(convertSeriesToPoints(drsData.result))
      } else {
        setDRS2({})
      }

      const gearData = await performQuery(
        `gear{car="${car}",session="${session}"}`,
        options
      )
      setGears(convertSeriesToPoints(gearData.result))

      if (car2 != '') {
        const gearData = await performQuery(
          `gear{car="${car2}",session="${session}"}`,
          options2
        )
        setGears2(convertSeriesToPoints(gearData.result))
      } else {
        setGears2({})
      }

      const speedData = await performQuery(
        `speed{car="${car}",session="${session}"}`,
        options
      )
      setSpeed(convertSeriesToPoints(speedData.result))

      if (car2 != '') {
        const speedData = await performQuery(
          `speed{car="${car2}",session="${session}"}`,
          options2
        )
        setSpeed2(convertSeriesToPoints(speedData.result))
      } else {
        setSpeed2({})
      }

      const steerData = await performQuery(
        `steer{car="${car}",session="${session}"} * -1`, // it makes sense to have left on the top if you look at the graph, otherswise -1 (left) would be at the bottom
        options
      )
      setSteering(convertSeriesToPoints(steerData.result))

      if (car2 != '') {
        const steerData = await performQuery(
          `steer{car="${car2}",session="${session}"} * -1`,
          options2
        )
        setSteering2(convertSeriesToPoints(steerData.result))
      } else {
        setSteering2({})
      }

      const throttleData = await performQuery(
        `throttle{car="${car}",session="${session}"}`,
        options
      )
      setThrottle(convertSeriesToPoints(throttleData.result))

      if (car2 != '') {
        const throttleData = await performQuery(
          `throttle{car="${car2}",session="${session}"}`,
          options2
        )
        setThrottle2(convertSeriesToPoints(throttleData.result))
      } else {
        setThrottle2({})
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    setShowGraph(true)
    setLoading(false)
  }

  useEffect(() => {
    if (session !== '' && car !== '') {
      graph()
    }
  }, [options])

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
        {gears2 ? (
          <Line
            data={Object.entries(gears2).map(([x, y]) => ({
              x: Number(x) + car2Offset,
              y,
            }))}
            curve="curveStep"
            opacity={0.4}
            color="#ED3C3C"
          />
        ) : null}
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
        {steering2 ? (
          <Line
            data={Object.entries(steering2).map(([x, y]) => ({
              x: Number(x) + car2Offset,
              y,
            }))}
            curve="curveBasis"
            opacity={0.4}
            color="#ED3C3C"
          />
        ) : null}
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
        {drs2 ? (
          <Line
            data={Object.entries(drs2).map(([x, y]) => ({
              x: Number(x) + car2Offset,
              y,
            }))}
            curve="curveStep"
            opacity={0.4}
            color="#ED3C3C"
          />
        ) : null}
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
        {throttle2 ? (
          <Line
            data={Object.entries(throttle2).map(([x, y]) => ({
              x: Number(x) + car2Offset,
              y,
            }))}
            curve="curveBasis"
            opacity={0.4}
            color="#ED3C3C"
          />
        ) : null}
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
        {speed2 ? (
          <Line
            data={Object.entries(speed2).map(([x, y]) => ({
              x: Number(x) + car2Offset,
              y: y,
            }))}
            curve="curveBasis"
            opacity={0.4}
            color="#ED3C3C"
          />
        ) : null}
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
        {brake2 ? (
          <Line
            data={Object.entries(brake2).map(([x, y]) => ({
              x: Number(x) + car2Offset,
              y,
            }))}
            curve="curveBasis"
            opacity={0.4}
            color="#ED3C3C"
          />
        ) : null}
      </FlexibleXYPlot>
      <button
        onClick={() => setWindow((window) => [window[0] + 60, window[1] + 60])}
      >
        Next
      </button>
    </div>
  )

  const sessionOptions = sessions.map((x) => (
    <option key={x.id} value={x.id}>
      {x.game} - {x.type} - {x.track}
    </option>
  ))

  const carOptions = cars.map((x) => (
    <option key={x.id} value={x.id}>
      {x.isAi ? 'AI' : 'Player'} '{x.isAi ? x.driver : x.player}'
      {x.isAi === false ? ` (as ${x.driver}) ` : ''} - car {x.number}
    </option>
  ))

  return (
    <div>
      <h1>Graph</h1>
      <Tip uuid="tip.graph-page.intro">
        <p>
          This page allows you to produce a telemetry graph, modeled after a
          real world example. To produce a graph, simply specify a session and
          car. The values can be found in the queries page.
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
            list="car"
          />
          <datalist id="car">{carOptions}</datalist>
        </label>
        <label>
          Car 2
          <input
            type="text"
            value={car2}
            onChange={(e) => setCar2(e.target.value)}
            list="car"
          />
        </label>
        <label>
          Car 2 offset
          <input
            type="number"
            value={car2Offset}
            onChange={(e) => setCar2Offset(Number(e.target.value))}
          ></input>
        </label>
        <button disabled={loading} onClick={graph} className="mt-2">
          Graph
        </button>
      </div>
      {showGraph ? renderedGraph : null}
    </div>
  )
}
