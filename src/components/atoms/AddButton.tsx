import { Tooltip } from '@material-ui/core'
import Fab, { FabProps } from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

interface Props extends Omit<FabProps, 'children'> {
  iconColor?: string
  tooltip?: string
}

export default ({ iconColor = 'white', tooltip = 'add', ...props }: Props) => (
  <Tooltip title={tooltip}>
    <Fab {...props}>
      <AddIcon style={{ color: iconColor }} />
    </Fab>
  </Tooltip>
)
