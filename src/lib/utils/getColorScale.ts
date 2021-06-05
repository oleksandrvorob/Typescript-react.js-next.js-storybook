import { blue, red, indigo, orange, green, teal, amber, cyan } from '@material-ui/core/colors'
import { scale } from 'chroma-js'

type Color = 'blue' | 'red' | 'indigo' | 'orange' | 'green' | 'teal' | 'amber' | 'cyan'

type Darkness =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'A100'
  | 'A200'
  | 'A400'
  | 'A700'

const colorMap = {
  blue,
  red,
  indigo,
  orange,
  green,
  teal,
  amber,
  cyan,
}

export default (
  howMany: number,
  howDark: Darkness = '400',
  range: Color[] = ['indigo', 'orange'],
): Array<string> => {
  return scale(range.map((c) => colorMap?.[c][howDark]))
    .mode('lch')
    .colors(howMany)
}
