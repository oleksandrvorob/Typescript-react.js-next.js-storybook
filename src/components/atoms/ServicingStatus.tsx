import Chip from '@material-ui/core/Chip'
import LensRoundedIcon from '@material-ui/icons/LensRounded'

const getColor = (status: string) => {
  let color = 'primary'
  switch (status) {
    case 'Paid Off':
      color = '#4caf50'
      break
    case 'Delinquent':
      color = '#f44336'
      break
    case 'Foreclosure':
      color = '#f44336'
      break
    case 'Performing':
      color = '#2196f3'
    case 'Assigned':
      color = '#64b5f6'
      break
    default:
      color = '#9e9e9e'
      break
  }

  return color
}

export default ({ status }) =>
  status ? (
    <Chip
      icon={<LensRoundedIcon style={{ fill: getColor(status) }} />}
      label={status}
      size="small"
    />
  ) : (
    ''
  )
