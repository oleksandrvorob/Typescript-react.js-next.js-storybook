import { Tooltip } from '@material-ui/core'
import Fab, { FabProps } from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'

interface Props extends FabProps {
  iconColor?: string
  tooltip?: string
}

export default ({ iconColor = 'white', tooltip = 'edit', ...props }: Props) => (
  <Tooltip title={tooltip}>
    <Fab {...props}>
      <EditIcon style={{ color: iconColor }} />
    </Fab>
  </Tooltip>
)
