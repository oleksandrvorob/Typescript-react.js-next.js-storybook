import { FunctionComponent } from 'react'

import Box from '@material-ui/core/Box'
import PinDropIcon from '@material-ui/icons/PinDrop'

import Statistic from 'components/Statistic'
import { Address as IAddress } from 'entities/Address'

interface Props {
  address: IAddress
}

const Address: FunctionComponent<Props> = ({ address }) => {
  if (!address) {
    return null
  }

  const secondLine = `${address.city}, ${address.state} ${address.zipCode}`

  return (
    <Box display="flex" alignItems="center">
      <PinDropIcon style={{ marginRight: '16px' }} color="primary" />
      <Statistic primary={address.streetLine1} secondary={secondLine} />
    </Box>
  )
}

export default Address
