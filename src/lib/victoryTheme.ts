import { VictoryTheme } from 'victory'

const victoryTheme = VictoryTheme.material
victoryTheme.axis.colorScale = ['white']
victoryTheme.axis.style.axis = { stroke: 'white' }
victoryTheme.bar.style.labels = {
  fontFamily: 'Roboto',
  fill: 'white',
}
victoryTheme.axis.style.tickLabels = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontSize: 14,
  fill: 'white',
}

export default victoryTheme
