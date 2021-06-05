import { useState, useCallback, FC } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import CancelIcon from '@material-ui/icons/Cancel'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { IconButton, Box, Typography } from '@material-ui/core'

import GetAvatar from './GetAvatar'
import FileItem from './FileItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    fileItem: {
      '&:hover': {
        background: theme.palette.action.hover,
      },
    },
    listButton: {
      color: theme.palette.text.secondary,
    },
    fileCopyIcon: {
      color: theme.palette.action.disabled,
      width: 56,
      height: 66,
    },
    noFilesContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '8rem',
    },
    noFilesMessage: {
      display: 'flex',
      height: '100%',
      maxWidth: '200px',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
)

export type fileObject = {
  id: number
  fileName: string
  fileType: string
  date: string
  file: any
  status?: number
}
interface FileListProps {
  fileList: fileObject[]
  onDelete: (id: number) => void
}

const FileList: FC<FileListProps> = ({ fileList, onDelete }: FileListProps) => {
  const [hovered, setHovered] = useState(null)
  const [isUploading, setIsUploading] = useState({})
  const classes = useStyles()

  // const handleMouseEnter = useCallback(
  //   (id) => {
  //     setIsHovered((prevState) => ({ ...prevState, [id]: true }))
  //   },
  //   [JSON.stringify(isHovered)],
  // )

  // const handleMouseLeave = useCallback(
  //   (id) => {
  //     setIsHovered((prevState) => ({ ...prevState, [id]: false }))
  //   },
  //   [isHovered],
  // )

  return (
    <>
      <List className={classes.root}>
        {fileList.map(({ id, fileName, date, fileType, status }) => (
          <FileItem id={id} fileName={fileName} fileType={fileType} uploadProgress={status} />
        ))}
      </List>
      {!fileList.length && (
        <Box className={classes.noFilesContainer}>
          <Box className={classes.noFilesMessage}>
            <Box>
              <FileCopyIcon className={classes.fileCopyIcon} />
            </Box>
            <Box>
              <Typography align="center" color="textSecondary">
                There are no uploaded <br /> documents yet
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default FileList
