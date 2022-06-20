import {
  ChartLabel,
  HorizontalGridLines,
  LineSeries as Line,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  makeWidthFlexible,
} from 'react-vis'

import '../graphs.css'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

export default function (): JSX.Element {
  return (
    <div>
      <h1>Graph</h1>
      <div className="card">
        <FlexibleXYPlot height={100} yDomain={[-1, 8]}>
          <YAxis hideTicks={true} />
          <ChartLabel
            text="Gears"
            includeMargin={false}
            xPercent={0}
            yPercent={1}
          />
          <Line
            data={[
              { x: 1, y: 0 },
              { x: 2, y: -1 },
              { x: 3, y: 0 },
              { x: 4, y: 1 },
              { x: 5, y: 8 },
            ]}
            curve="curveStep"
          />
          <Line />
        </FlexibleXYPlot>
        <FlexibleXYPlot height={100} yDomain={[-1, 1]}>
          <YAxis hideTicks={true} />
          <HorizontalGridLines tickValues={[0]} />
          <ChartLabel
            text="Steering"
            includeMargin={false}
            xPercent={0}
            yPercent={1}
          />
          <Line
            data={[
              { x: 1, y: -1 },
              { x: 2, y: 0.5 },
              { x: 3, y: 1 },
              { x: 4, y: -0.8 },
            ]}
          />
          <Line />
        </FlexibleXYPlot>
        <FlexibleXYPlot height={100} yDomain={[0, 1]}>
          <YAxis hideTicks={true} />
          <ChartLabel
            text="DRS"
            includeMargin={false}
            xPercent={0}
            yPercent={1}
          />
          <Line
            data={[
              { x: 1, y: 0 },
              { x: 2, y: 1 },
              { x: 3, y: 1 },
              { x: 4, y: 0 },
            ]}
            curve="curveStep"
          />
          <Line />
        </FlexibleXYPlot>
        <FlexibleXYPlot height={100} yDomain={[0, 1]}>
          <YAxis hideTicks={true} />
          <ChartLabel
            text="Throttle"
            includeMargin={false}
            xPercent={0}
            yPercent={1}
          />
          <Line
            data={[
              { x: 1, y: 0 },
              { x: 2, y: 1 },
              { x: 3, y: 1 },
              { x: 4, y: 0 },
            ]}
          />
          <Line />
        </FlexibleXYPlot>
        <FlexibleXYPlot height={200}>
          <YAxis hideTicks={true} />
          <ChartLabel
            text="Speed"
            includeMargin={false}
            xPercent={0}
            yPercent={1}
          />
          <Line
            data={[
              { x: 1, y: 250 },
              { x: 2, y: 270 },
              { x: 3, y: 150 },
              { x: 4, y: 80 },
            ]}
          />
          <Line />
        </FlexibleXYPlot>
        <FlexibleXYPlot height={100} yDomain={[0, 1]}>
          <YAxis hideTicks={true} />
          <ChartLabel
            text="Brake"
            includeMargin={false}
            xPercent={0}
            yPercent={1}
          />
          <Line
            data={[
              { x: 1, y: 0 },
              { x: 2, y: 0 },
              { x: 3, y: 0.8 },
              { x: 4, y: 1 },
            ]}
          />
          <Line />
        </FlexibleXYPlot>
      </div>
    </div>
  )
}
