import { FunctionComponent } from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

interface Props {
  primary: string
  secondary: string
}

const Statistic: FunctionComponent<Props> = ({ primary, secondary }) => {
  return (
    <Box display="flex" flexDirection="column" my="6px">
      <Typography variant="body1" component="span" display="block" color="textPrimary">
        {primary}
      </Typography>
      <Typography variant="body2" color="textSecondary" display="block">
        {secondary}
      </Typography>
    </Box>
  )
}

export default Statistic
