import { makeStyles } from '@material-ui/core/styles'
import BlockIcon from '@material-ui/icons/Block'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

interface Props {
  fontSize?: number
  isDragAccept?: boolean
  isDragActive?: boolean
}

const useStyles = makeStyles({
  icons: { fontSize: (props: Props) => props.fontSize },
})

export default ({ fontSize = 56, isDragAccept = true, isDragActive = false }: Props) => {
  const classes = useStyles({ fontSize })
  return isDragActive && !isDragAccept ? (
    <BlockIcon color="error" className={classes.icons} />
  ) : (
    <CloudUploadIcon color="primary" className={classes.icons} />
  )
}
