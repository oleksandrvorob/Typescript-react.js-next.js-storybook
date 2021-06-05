import { FunctionComponent } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import Link from 'components/atoms/Link'
import StatusBox from 'components/atoms/StatusBox'

import useDrawHistory from 'lib/hooks/useDrawHistory'
import { getTimeStamp } from 'lib/utils'

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

interface Props {
  loanId: number
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  spaceRight: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const DrawHistory: FunctionComponent<Props> = ({ loanId }) => {
  const classes = useStyles()
  const [drawRequests] = useDrawHistory(loanId)

  drawRequests && drawRequests.sort((a, b) => (a.drawNumber > b.drawNumber ? 1 : -1))

  return (
    <Box overflow="auto" maxHeight={450} className={classes.root} px={2}>
      {drawRequests &&
        drawRequests?.reverse().map((item, index) => (
          <>
            {index > 0 && <Divider />}
            <Box display="flex" flexDirection="column">
              <Box display="flex" marginBottom="4px">
                <Link
                  key={index}
                  title={`DR-${item.drawNumber}`}
                  href={`/loan-contract/${loanId}/draw-requests/${item?.drawNumber}`}
                  variant="button"
                />
                <StatusBox>{item.status}</StatusBox>
              </Box>

              <HistoryItem label="Requested Date" value={getTimeStamp(item.requestedDate)} />
              <HistoryItem label="Requested Amount" value={item.requestedAmount} />
              <HistoryItem label="Funded Date" value={getTimeStamp(item.disbursedDate)} />
              <HistoryItem label="Funded Amount" value={item.approvedAmount} />
            </Box>
          </>
        ))}
    </Box>
  )
}

export default DrawHistory
