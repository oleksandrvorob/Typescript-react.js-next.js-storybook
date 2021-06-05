import { FunctionComponent } from 'react'
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from 'victory'

import { getColorScale } from 'lib/utils'
import victoryTheme from 'lib/victoryTheme'

// interface Datum {
//   x: number
//   y: number
// }

// interface Row {
//   year: number
//   data: Datum[]
// }

// interface Props {
//   rows: Row[]
// }

const rows = [
  {
    x: '11/2016',
    y: 0,
  },
  {
    x: '12/2016',
    y: 0.5,
  },
  {
    x: '01/2017',
    y: 0.5,
  },
  {
    x: '02/2017',
    y: 3.33,
  },
  {
    x: '03/2017',
    y: 3.57,
  },
  {
    x: '04/2017',
    y: 3.2,
  },
  {
    x: '05/2017',
    y: 1.83,
  },
  {
    x: '06/2017',
    y: 0,
  },
  {
    x: '07/2017',
    y: 1.33,
  },
  {
    x: '08/2017',
    y: 2.5,
  },
  {
    x: '09/2017',
    y: 8.67,
  },
  {
    x: '10/2017',
    y: 9.83,
  },
  {
    x: '11/2017',
    y: 2.44,
  },
  {
    x: '12/2017',
    y: 0.75,
  },
  {
    x: '01/2018',
    y: 0.96,
  },
  {
    x: '02/2018',
    y: 1.65,
  },
  {
    x: '03/2018',
    y: 1.71,
  },
  {
    x: '04/2018',
    y: 5.1,
  },
  {
    x: '05/2018',
    y: 4.85,
  },
  {
    x: '06/2018',
    y: 2.83,
  },
  {
    x: '07/2018',
    y: 1.43,
  },
  {
    x: '08/2018',
    y: 2.13,
  },
  {
    x: '09/2018',
    y: 2.58,
  },
  {
    x: '10/2018',
    y: 0.62,
  },
  {
    x: '11/2018',
    y: 0.35,
  },
  {
    x: '12/2018',
    y: 0.57,
  },
  {
    x: '01/2019',
    y: 0.61,
  },
  {
    x: '02/2019',
    y: 0.31,
  },
  {
    x: '03/2019',
    y: 0.18,
  },
  {
    x: '04/2019',
    y: 0.22,
  },
  {
    x: '05/2019',
    y: 0.29,
  },
  {
    x: '06/2019',
    y: 0.19,
  },
  {
    x: '07/2019',
    y: 0.01,
  },
  {
    x: '08/2019',
    y: 0.01,
  },
  {
    x: '09/2019',
    y: 0,
  },
  {
    x: '10/2019',
    y: 0,
  },
  {
    x: '11/2019',
    y: 0,
  },
  {
    x: '12/2019',
    y: 0,
  },
  {
    x: '01/2020',
    y: 0.17,
  },
  {
    x: '02/2020',
    y: 0.14,
  },
  {
    x: '03/2020',
    y: 0,
  },
  {
    x: '04/2020',
    y: 0,
  },
  {
    x: '05/2020',
    y: 0,
  },
  {
    x: '06/2020',
    y: 0,
  },
]

const Chart: FunctionComponent = () => {
  const colors = getColorScale(rows.length, '300')
  return (
    <VictoryChart
      theme={victoryTheme}
      domainPadding={{ y: 0, x: 0 }}
      containerComponent={<VictoryContainer title="$ by year" />}
      height={300}
    >
      <VictoryAxis tickCount={3} />
      <VictoryAxis dependentAxis tickFormat={(t) => `${t} days`} />
      <VictoryLine
        style={{ data: { stroke: colors[1], padding: 0 } }}
        data={rows}
        interpolation={'monotoneX'}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
      />
      {/* <VictoryLegend title="$ by year" centerTitle data={[]} x={150} y={325} /> */}
      {/* <VictoryLegend
        data={rows.map((x, i) => ({ name: String(x.year), symbol: { fill: colors[i] } })).reverse()}
        orientation="vertical"
        x={304}
        y={50}
        symbolSpacer={8}
      /> */}
    </VictoryChart>
  )
}

export default Chart
