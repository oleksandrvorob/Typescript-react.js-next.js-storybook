import { FunctionComponent } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    margin: theme.spacing(3),
  },
}))

interface Props {
  onSubmit: (name: string) => void
  onCancel: () => void
}

interface Form {
  name: string
}

const PermissionForm: FunctionComponent<Props> = ({ onCancel, onSubmit }) => {
  const { register, handleSubmit } = useForm<Form>()
  const classes = useStyles()

  const format = (data: Form) => {
    onSubmit(data.name)
  }

  return (
    <form onSubmit={handleSubmit(format)}>
      <div className={classes.root}>
        <TextField inputRef={register} name="name" label="Permission Name" />
      </div>
      <DialogActions>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button variant="text" color="primary" startIcon={<SendIcon />} type="submit">
          Submit
        </Button>
      </DialogActions>
    </form>
  )
}

export default PermissionForm
