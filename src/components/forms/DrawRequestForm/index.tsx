import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
// import useSWR from 'swr'

import AddButton from 'components/atoms/AddButton'
import Transition from 'components/atoms/Transition'

import Form from './Form'
import { post } from 'lib/fetch'

export default function FormDialog({ onSuccess }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    onSuccess()
    setOpen(false)
  }

  const onSubmit = async (data, _e) => {
    try {
      const res = await post(
        `api/loancontract/${data.lid.id}/draw-requests`,
        JSON.stringify({ ...data }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      // TODO: use global message here
      handleClose()
    } catch (e) {
      // TODO: display error message
      console.log(e)
    }
  }

  return (
    <>
      <AddButton tooltip="Create new draw request" color="primary" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">New Draw Request</DialogTitle>
        <DialogContent>
          <Form handleCancel={() => handleClose()} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  )
}
