import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CloudUpload } from '@material-ui/icons'
import { FC } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
)

interface UploadButtonProps {
  onUpload: (fileList: FileList) => void
}

const UploadButton: FC<UploadButtonProps> = ({ onUpload }: UploadButtonProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <input
        accept="*"
        onChange={(event) => onUpload(event.target.files)}
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="outlined"
          size="small"
          endIcon={<CloudUpload />}
          color="primary"
          component="span"
        >
          Upload
        </Button>
      </label>
    </div>
  )
}

export default UploadButton
