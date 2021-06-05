import { FunctionComponent } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import InputAdornment from '@material-ui/core/InputAdornment'

import LockIcon from '@material-ui/icons/Lock'

interface Props {
  tooltip?: string
}

const DEFAULT_MSG = 'You do not have permission to edit this field.'

const NoPermission: FunctionComponent<Props> = ({ tooltip = DEFAULT_MSG }) => (
  <InputAdornment position="end">
    <Tooltip title={tooltip}>
      <LockIcon />
    </Tooltip>
  </InputAdornment>
)

export default NoPermission
