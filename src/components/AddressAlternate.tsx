import { FunctionComponent } from 'react'

import Box from '@material-ui/core/Box'
import PinDropIcon from '@material-ui/icons/PinDrop'

import Statistic from 'components/Statistic'
import { LoanContract } from 'entities/LoanContract'

interface Props {
  loanContract: LoanContract
}

const Address: FunctionComponent<Props> = ({ loanContract }) => {
  if (!loanContract.fullAddress) {
    return null
  }

  const [firstLine, ...rest] = loanContract.fullAddress.split(', ')
  const secondLine = rest.join(', ')

  return (
    <Box display="flex" alignItems="center">
      <PinDropIcon style={{ marginRight: '16px' }} color="primary" />
      <Statistic primary={firstLine} secondary={secondLine} />
    </Box>
  )
}

export default Address
