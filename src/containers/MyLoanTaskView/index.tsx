import { FC } from 'react'
import { useRouter } from 'next/router'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import TaskAccordion from 'components/TaskAccordion'
import LoanDetails from 'components/forms/LoanDetails'

import GetForm from './GetForm'

import titleCase from 'lib/utils/titleCase'

const SECTIONS = ['application-details', 'property-information']

const MyLoanTaskView: FC<{
  onBack: () => void
}> = ({ onBack }) => {
  const router = useRouter()
  const { slug } = router.query

  const section = SECTIONS.includes(slug?.[0]) ? slug?.[0] : SECTIONS[0]
  const task = slug?.[1]

  const handleSetActiveTask = (sectionName, taskName) => {
    router.replace('/loans/[id]/[...slug]', `/loans/123/${sectionName}/${taskName}`, {
      shallow: true,
    })
  }

  return (
    <Dialog open fullScreen>
      <AppBar position="sticky" variant="outlined" color="default">
        <Toolbar>
          <IconButton onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box gridTemplateColumns="9fr 3fr" gridGap="16px" display="grid">
        <Container maxWidth="md">
          <Box marginTop="4%" maxWidth="750px">
            <Typography variant="h4">{titleCase(task.replace(/-/g, ' '))}</Typography>
            <Typography>
              Below are all of the details we have about your deal. If you have to change these
              details you may do so below, please note that changes may affect your Loan-to-Value or
              your rate.
            </Typography>
          </Box>
          <Box marginTop="4%">
            <GetForm taskName={task} />
          </Box>
        </Container>
        <Box>
          <TaskAccordion
            activeSection={section}
            setActiveTask={handleSetActiveTask}
            activeTask={task}
          />
        </Box>
      </Box>
    </Dialog>
  )
}

export default MyLoanTaskView
