import { useRouter } from 'next/router'

// mui components
import { makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import Layout from 'components/Layout'
import { post } from 'lib/fetch'
// import { LoanQuote } from 'entities/LoanQuote'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}))

const LoansPage = () => {
  const classes = useStyles()

  const router = useRouter()

  const postLoanQuote = async () => {
    try {
      const { id } = await post('/api/v1/loan-quotes', JSON.stringify({}), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // refresh()

      router.push(`/loan-quotes/${id}`)
    } catch (e) {
      // setMessage(e, 'error')
    }
  }

  return (
    <Layout>
      <Box display="flex" flexDirection="column" className={classes.root}>
        <Button variant="outlined" color="primary" size="large" onClick={() => postLoanQuote()}>
          Fix and Flip
        </Button>
        {/* TODO: this should not alway be disabled */}
        <Button href="/loan-quotes" variant="outlined" color="primary" size="large" disabled>
          Rental
        </Button>
      </Box>
    </Layout>
  )
}

export default LoansPage
