import { Typography } from '@material-ui/core'

import { getTwitterDate } from 'lib/utils'

const TimeStamp = ({ timestamp }) => {
  return <Typography variant="caption">{getTwitterDate(timestamp)}</Typography>
}

export default TimeStamp
