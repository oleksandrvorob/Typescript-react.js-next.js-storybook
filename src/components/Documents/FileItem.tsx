import { FC, useRef } from 'react'
import clsx from 'clsx'

import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import ListItemText from '@material-ui/core/ListItemText'
import LinearProgress from '@material-ui/core/LinearProgress'

// icons
import DeleteIcon from '@material-ui/icons/Delete'

import useHover from 'hooks/useHover'
import GetAvatar from './GetAvatar'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.hovered': {
      background: theme.palette.action.hover,
    },
  },
  listButton: {
    color: theme.palette.text.secondary,
  },
}))

const FileItem: FC<{
  fileType: string
  fileName: string
  id: number
  uploadProgress?: number
  onDelete?(id: number): void
}> = ({ fileType, fileName, id, onDelete, uploadProgress = 0 }) => {
  const classes = useStyles()
  const hoverRef = useRef(null)

  const isHover = useHover(hoverRef)

  return (
    <ListItem
      className={clsx(classes.root, {
        hovered: isHover,
      })}
      key={id}
      ref={hoverRef}
    >
      <GetAvatar fileType={fileType} />
      <ListItemText primary={fileName} />
      {isHover ? (
        <ListItemSecondaryAction>
          <IconButton onClick={() => onDelete !== undefined && onDelete(id)} edge="end">
            <DeleteIcon className={classes.listButton} />
          </IconButton>
        </ListItemSecondaryAction>
      ) : (
        <ListItemText>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </ListItemText>
      )}
    </ListItem>
  )
}

export default FileItem
