import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryLegend,
} from 'victory'
import _sortBy from 'lodash/sortBy'

import { getColorScale } from 'lib/utils'

export default ({ rows }) => {
  const colors = getColorScale(rows.length, '300', ['blue', 'amber', 'red'])
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLegend
        data={rows.map(({ name }, i: number) => ({ name, symbol: { fill: colors[i] } }))}
        x={285}
        y={50}
        labelComponent={<VictoryLabel textAnchor="end" dx={-18} dy={18} angle={45} />}
      />
      <VictoryStack>
        {rows.map((r, i) => (
          <VictoryBar data={_sortBy(r?.data, 'x')} key={i} style={{ data: { fill: colors[i] } }} />
        ))}
      </VictoryStack>
      <VictoryAxis
        tickLabelComponent={<VictoryLabel dy={-6} />}
        style={{
          tickLabels: { fontSize: 8, angle: -75 },
          grid: { stroke: '' },
        }}
      />
    </VictoryChart>
  )
}
