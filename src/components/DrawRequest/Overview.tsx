import { FC, ReactElement } from 'react'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Stack from 'components/Stack'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import RoomIcon from '@material-ui/icons/Room'

import { getTimeStamp, getFloat, formatMoney } from 'lib/utils'

import { DrawRequest } from 'lib/interfaces'

const Address: FC<{
  address: string
  city: string
  state: string
}> = ({ address, city, state }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="15px auto"
      gridTemplateRows="32px 20px"
      gridColumnGap="16px"
      justifyContent="start"
      alignItems="center"
      width="100%"
    >
      <RoomIcon color="primary" />
      <Typography variant="h5" color="textPrimary" noWrap>
        {address}
      </Typography>
      <div />
      <Typography variant="body2" color="textPrimary" noWrap>
        {city}, {state}
      </Typography>
    </Box>
  )
}

const StatSmall: FC<{
  primary: string
  secondary: string
}> = ({ primary, secondary }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle1" color="textPrimary" noWrap>
        {primary}
      </Typography>
      <Typography variant="body2" color="textSecondary" noWrap>
        {secondary}
      </Typography>
    </Box>
  )
}

const Stat: FC<{
  primary: string
  secondary: string
}> = ({ primary, secondary }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5" color="textPrimary" noWrap>
        {primary || <span>-</span>}
      </Typography>
      <Typography variant="body2" color="textSecondary" noWrap style={{ fontSize: '14px' }}>
        {secondary}
      </Typography>
    </Box>
  )
}

const OverView: FC<{
  buttonComponent?: ReactElement
  address: string
  city: string
  state: string
  drawRequest: DrawRequest
  borrowerName: string
  actions?: ReactElement
}> = ({ address, city, state, drawRequest, borrowerName, actions }) => {
  const netWireOut =
    getFloat(drawRequest.approvedAmount) -
    getFloat(drawRequest.inspectionFee) -
    getFloat(drawRequest.wireFee)

  return (
    <Card style={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" padding="16px" alignItems="center">
        <Address address={address} city={city} state={state} />
        {actions}
      </Box>
      <Divider variant="middle" />
      <CardContent>
        <Stack>
          <Box display="grid" gridTemplateColumns="25% 25% 25% 25%" paddingX="32px">
            <Stat primary={drawRequest.requestedAmount} secondary="Requested Amount" />
            <Stat primary={drawRequest.approvedAmount} secondary="Approved Amount" />
            <Stat primary={getTimeStamp(drawRequest.disbursedDate)} secondary="Disbursed Date" />
          </Box>

          <Box display="grid" gridTemplateColumns="50% 50%" paddingX="32px">
            <Box marginRight="16px">
              <StatSmall primary={borrowerName} secondary="Borrower" />
            </Box>
            <Box display="grid" gridTemplateColumns="33% 33% 33%">
              <StatSmall primary={drawRequest.inspectionFee} secondary="Inspection Fee" />
              <StatSmall primary={drawRequest.wireFee} secondary="Wire Fee" />
              <StatSmall primary={formatMoney(netWireOut)} secondary="Net Wire Out" />
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default OverView
