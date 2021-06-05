import { ListItemAvatar, Avatar } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ImageIcon from '@material-ui/icons/Image'
import FolderIcon from '@material-ui/icons/Folder'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageAvatar: {
      color: theme.palette.info.light,
      backgroundColor: 'rgba(33,150,243,0.2)',
    },
    pdfAvatar: {
      color: theme.palette.error.main,
      backgroundColor: 'rgba(247,89,54,0.2)',
    },
    xlsAvatar: {
      color: '#185A30',
      backgroundColor: 'rgba(24,90,48,0.2)',
    },
    docAvatar: {
      color: '#223E74',
      backgroundColor: 'rgba(34,62,116,0.2)',
    },
  }),
)

const GetAvatar = ({ fileType }) => {
  const classes = useStyles()

  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    return (
      <ListItemAvatar>
        <Avatar className={classes.imageAvatar}>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
    )
  }

  if (fileType === 'pdf') {
    return (
      <ListItemAvatar>
        <Avatar className={classes.pdfAvatar}>
          <strong>P</strong>
        </Avatar>
      </ListItemAvatar>
    )
  }

  if (fileType === 'xls') {
    return (
      <ListItemAvatar>
        <Avatar className={classes.xlsAvatar}>
          <strong>X</strong>
        </Avatar>
      </ListItemAvatar>
    )
  }

  if (fileType === 'doc') {
    return (
      <ListItemAvatar>
        <Avatar className={classes.docAvatar}>
          <strong>W</strong>
        </Avatar>
      </ListItemAvatar>
    )
  }

  return (
    <ListItemAvatar>
      <Avatar>
        <FolderIcon />
      </Avatar>
    </ListItemAvatar>
  )
}

export default GetAvatar
