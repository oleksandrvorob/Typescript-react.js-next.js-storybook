import { FunctionComponent } from 'react'

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import Transition from 'components/atoms/Transition'

interface Props {
  open: boolean
  title: string
  handleClose: () => void
}

const FormDialog: FunctionComponent<Props> = ({ title, open, handleClose, children }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="inspection-form-dialog"
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <DialogTitle id={title}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default FormDialog
