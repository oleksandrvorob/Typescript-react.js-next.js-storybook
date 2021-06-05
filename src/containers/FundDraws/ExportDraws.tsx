import { useState } from 'react'
import format from 'date-fns/format'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

import DatePicker from 'components/fields/DatePicker'

import { createQueryString, getTimeStamp } from 'lib/utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  horizontal: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const ExportDraws = () => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const classes = useStyles()

  const queryString = createQueryString('csv/funded-draws', [
    ['startDate', format(startDate, 'MM-dd-yyyy')],
    ['endDate', format(endDate, 'MM-dd-yyyy')],
  ])

  return (
    <Container>
      <Box display="flex" flexDirection="column" className={classes.root}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.horizontal}
        >
          <DatePicker
            format="MM/dd/yyyy"
            disableFuture
            label="Start Date"
            error={Boolean(!startDate)}
            defaultValue={new Date()}
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            format="MM/dd/yyyy"
            disableFuture
            label="End Date"
            error={Boolean(!endDate)}
            defaultValue={new Date()}
            value={endDate}
            onChange={setEndDate}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          href={queryString}
          download={`funded-draws-${getTimeStamp(startDate)}-${getTimeStamp(endDate)}.csv`}
        >
          Download
        </Button>
      </Box>
    </Container>
  )
}

export default ExportDraws
