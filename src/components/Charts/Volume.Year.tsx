import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLegend,
  VictoryLine,
  VictoryTheme,
} from 'victory'

import { getColorScale, metricPrefix } from 'lib/utils'

interface Datum {
  x: number
  y: number
}

interface Row {
  year: number
  data: Datum[]
}

interface Props {
  rows: Row[]
}

export default ({ rows }: Props) => {
  const colors = getColorScale(rows.length, '300')
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ y: 0, x: 0 }}
      containerComponent={<VictoryContainer title="$ by year" />}
    >
      <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
      <VictoryAxis dependentAxis tickFormat={(t) => `$${metricPrefix(t, 2)}`} />
      {rows.map((x: Row, i: number) => (
        <VictoryLine
          style={{ data: { stroke: colors[i], padding: 0 } }}
          data={x.data}
          interpolation={'monotoneX'}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />
      ))}
      <VictoryLegend title="$ by year" centerTitle data={[]} x={150} y={325} />
      <VictoryLegend
        data={rows.map((x, i) => ({ name: String(x.year), symbol: { fill: colors[i] } })).reverse()}
        orientation="vertical"
        x={304}
        y={50}
        symbolSpacer={8}
      />
    </VictoryChart>
  )
}
