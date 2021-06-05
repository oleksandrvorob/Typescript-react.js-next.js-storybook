import { FunctionComponent } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

import { DrawRequest } from 'lib/interfaces'
import { getTimeStamp } from 'lib/utils'

import Link from 'components/atoms/Link'
import StatusBox from 'components/atoms/StatusBox'

import HistoryItem from './HistoryItem'

interface Props {
  loanId: number
  drawRequests: DrawRequest[]
  maxHeight?: number
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

const History: FunctionComponent<Props> = ({ loanId, drawRequests, maxHeight = 450 }) => {
  const classes = useStyles()

  return (
    <Box overflow="auto" maxHeight={maxHeight} className={classes.root} px={2}>
      {drawRequests &&
        drawRequests.map((item, index) => (
          <>
            {index > 0 && <Divider />}
            <Box display="flex" flexDirection="column">
              <Box display="flex">
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

export default History
