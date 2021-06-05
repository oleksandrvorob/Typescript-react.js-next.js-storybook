import React from 'react'
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryLine,
  VictoryBar,
  VictoryLabel,
  VictoryScatter,
  VictoryLegend,
} from 'victory'

import { useTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

import { metricPrefix } from 'lib/utils'

export default ({ rowsMonth, rowsAvg, rowsStates }) => {
  const theme = useTheme()

  console.log(rowsAvg, rowsStates)

  return (
    <VictoryChart width={800}>
      <VictoryLegend
        x={0}
        y={0}
        title=""
        centerTitle
        orientation="horizontal"
        data={[
          // @ts-ignore
          { name: 'Funded amount', symbol: { fill: blue['200'], stroke: blue[400] } },
          { name: 'Rolling avg', symbol: { fill: blue[400], type: 'minus' } },
        ]}
      />
      <VictoryArea
        sortKey="x"
        interpolation={'monotoneX'}
        data={rowsMonth.map(({ x, y }) => ({ x, y: Number(y) }))}
        style={{
          data: {
            stroke: blue[200],
            fill: blue[100],
            strokeWidth: '1.618',
          },
        }}
      />
      <VictoryBar
        data={rowsStates}
        barWidth={0.618}
        sortKey="x"
        style={{
          data: { fill: blue['50'], opacity: '0.6' },
          labels: {
            paddingRight: 16,
            paddingLeft: '16',
            fontSize: 8,
            fontFamily: 'Roboto',
            fill: theme.palette.text.secondary,
          },
        }}
        labelComponent={<VictoryLabel angle={-45} dx={4} dy={-2} textAnchor="start" />}
      />
      <VictoryLine
        sortKey="x"
        data={rowsAvg.map(({ x, y }) => ({ x, y: Number(y) }))}
        style={{
          data: { strokeDasharray: '0.618em', stroke: blue[400] },
        }}
      />
      <VictoryScatter
        data={rowsMonth.map(({ x, y }) => ({ x, y: Number(y) }))}
        style={{
          data: { stroke: blue[400], fill: blue[200], strokeWidth: '1.618' },
        }}
      />
      <VictoryAxis
        tickFormat={(t) => (t?.length ? `${t.slice(4)}/${t.slice(0, 4)}` : '')}
        fixLabelOverlap
        style={{
          axis: { stroke: theme.palette.divider },
          tickLabels: {
            stroke: theme.palette.text.secondary,
            fontFamily: 'Roboto',
            fontWeight: 100,
            fontSize: '8px',
          },
        }}
      />

      <VictoryAxis
        dependentAxis
        style={{ axis: { stroke: 'transparent' } }}
        tickFormat={(t) => `$${metricPrefix(t, 2)}`}
      />
    </VictoryChart>
  )
}
