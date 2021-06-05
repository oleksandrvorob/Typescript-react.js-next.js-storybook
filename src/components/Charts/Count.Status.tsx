import { useState } from 'react'
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryLabel, VictoryContainer } from 'victory'
import { useTheme } from '@material-ui/core'

import { getColorScale } from 'lib/utils'

interface Datum {
  x: string
  y: number
}

interface Props {
  rows: Datum[]
}

const Label = ({ hoverLabel, activeColor, ...props }) => {
  return (
    <VictoryLabel
      {...props}
      style={{
        fontFamily: 'Roboto',
        fontWeight: 600,
        fill: props?.datum?.xName === hoverLabel ? activeColor : 'transparent',
      }}
    />
  )
}

export default ({ rows }: Props) => {
  const theme = useTheme()

  const [hoverLabel, setHoverLabel] = useState()
  const colors = getColorScale(rows.length, '200', ['indigo', 'blue', 'amber', 'orange', 'red'])
  const legendRows = rows.map((x, i) => ({ name: x.x, symbol: { fill: colors[i] } }))

  return (
    // @ts-ignore
    <VictoryContainer width="350" height="350" viewBox="0 0 350 350">
      <VictoryPie
        name="pie"
        // externalEventMutations={externalMutations}
        standalone={false}
        data={rows.map(({ x, y }) => ({ x, y: Number(y) }))}
        colorScale={colors}
        theme={VictoryTheme.material}
        style={{
          parent: { backgroundColor: 'transparent' },
          labels: { fill: 'blue' },
        }}
        labelPosition="centroid"
        // @ts-ignore
        labelComponent={
          <Label
            text={({ datum }) => {
              return `${datum.x}: ${datum.y}`
            }}
            activeColor={theme.palette.text.secondary}
            hoverLabel={hoverLabel}
          />
        }
        events={[
          {
            target: 'data',
            eventHandlers: {
              onMouseEnter: () => {
                return [
                  {
                    mutation: ({ style, datum }) => {
                      setHoverLabel(datum?.xName)
                      return {
                        ...style,
                        transform: 'translate(175, 175) scale(1.04)',
                      }
                    },
                  },
                ]
              },
              onMouseLeave: () => {
                return [
                  {
                    target: 'data',
                    mutation: ({ style, datum }) => {
                      if (datum?.xName === hoverLabel) {
                        setHoverLabel(null)
                      }
                      return { ...style, transform: 'translate(175, 175)' }
                    },
                  },
                ]
              },
            },
          },
        ]}
      />
      <VictoryLegend
        orientation="horizontal"
        animate={{ onLoad: { duration: 1000 } }}
        data={legendRows.slice(0, 3)}
        standalone={false}
        style={{
          labels: { fill: theme.palette.text.secondary, fontFamily: 'Roboto', fontSize: 12 },
        }}
        y={325}
        x={0}
      />
      <VictoryLegend
        orientation="horizontal"
        animate={{ onLoad: { duration: 1000 } }}
        data={legendRows.slice(3)}
        standalone={false}
        style={{
          labels: { fill: theme.palette.text.secondary, fontFamily: 'Roboto', fontSize: 12 },
        }}
        y={300}
      />
      >
    </VictoryContainer>
  )
}
