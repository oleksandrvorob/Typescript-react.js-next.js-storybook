import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import BlockIcon from '@material-ui/icons/Block'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

interface Props {
  fontSize?: number
  isDragAccept?: boolean
  isDragActive?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      fontSize: (props: Props) => props.fontSize,
      color: theme.palette.action.disabled,
    },
  }),
)

const CloudIcon = ({ fontSize = 56, isDragAccept = true, isDragActive = false }: Props) => {
  const classes = useStyles({ fontSize })
  return isDragActive && !isDragAccept ? (
    <BlockIcon color="error" className={classes.icons} />
  ) : (
    <CloudUploadIcon className={classes.icons} />
  )
}

export default CloudIcon
