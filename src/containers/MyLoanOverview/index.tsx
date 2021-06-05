import { FC } from 'react'
import { useRouter } from 'next/router'

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import Link from '@material-ui/core/Link'

import CloseIcon from '@material-ui/icons/Close';

const MyLoanOverview: FC<{ loanId: number }> = ({ loanId }) => {
  const router = useRouter()
  const { slug } = router.query


  const handleClose = () => {
    router.push('/loans')
  }

  return (
    <Dialog open fullScreen>
      <AppBar position="sticky" variant="outlined" color="default">
        <Toolbar>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box gridTemplateColumns="9fr 3fr" gridGap="16px" display="grid">
        <Box><Link href={`/loans/${loanId}/application-details/provide-loan-details`}>Loan Id {loanId}</Link></Box>
        <Box borderLeft="1px solid grey">dude</Box>
      </Box >
    </Dialog>
  )
}


export default MyLoanOverview