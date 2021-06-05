import { FunctionComponent } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'

import victoryTheme from 'lib/victoryTheme'

interface Datum {
  x: string
  y: number
}

interface Props {
  rows: Datum[]
}

const Chart: FunctionComponent<Props> = ({ rows }) => {
  const getMoney = (num) =>
    !!num ? `$${num?.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : null

  return (
    <VictoryChart domainPadding={{ x: 150 }} theme={victoryTheme} height={300}>
      <VictoryBar
        data={rows}
        labels={({ datum }) => `${getMoney(datum.y)}`}
        // @ts-ignore
        style={{ data: { fill: () => 'white' } }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
      />
      <VictoryAxis style={{ grid: { stroke: '' } }} />
    </VictoryChart>
  )
}

export default Chart
