import { useState } from 'react'
import styled from 'styled-components'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@material-ui/core'
// import { makeStyles, Theme } from '@material-ui/core/styles'

import Foo from 'components/FileDrop'

// const useStyles = makeStyles((_theme: Theme) => ({
//   paper: { padding: '32px' },
// }))

const Grid = styled.div`
  display: grid;
  grid-template-columns: 4fr 8fr;
  grid-gap: 16px;
`

export default () => {
  // const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  return (
    <Grid>
      <Paper elevation={3}>
        <button onClick={() => setOpen(true)}>click me</button>
      </Paper>
      <Paper elevation={1}>
        <div style={{ background: 'grey' }}></div>
      </Paper>
      <Dialog open={open} onClose={() => handleClose()} disableBackdropClick>
        <DialogTitle>File Upload</DialogTitle>
        <DialogContent>
          <Foo />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button color="primary" variant="outlined">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
