import { useContext } from 'react'

import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { AppContext } from 'lib/appContext'

export default () => {
  const { message, messageLevel, showMessage, setMessage } = useContext(AppContext)

  const handleClose = () => setMessage('')

  return (
    <Snackbar
      open={showMessage}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={messageLevel} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}
