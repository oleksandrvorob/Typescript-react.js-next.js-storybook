import { FunctionComponent } from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

interface HistoryProps {
  label: string
  value: string
}

const HistoryItem: FunctionComponent<HistoryProps> = ({ label, value }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="caption" color="textSecondary">
        <strong>{label}:</strong>
      </Typography>
      <Typography variant="caption">{value ? value : '-'}</Typography>
    </Box>
  )
}

export default HistoryItem
