import { Typography } from '@material-ui/core'

import Flex from '../Flex'

interface Props {
  label: string
  value: string
}

const StatY = (props: Props) => (
  <Flex direction="column" align="center">
    <Typography variant="caption" color="textPrimary" style={{ fontWeight: 'bold' }}>
      {props?.label}
    </Typography>
    <Typography variant="subtitle2" color="textSecondary">
      {props?.value ? props.value : '-'}
    </Typography>
  </Flex>
)

export default StatY
