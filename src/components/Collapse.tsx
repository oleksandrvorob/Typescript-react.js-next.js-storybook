import { ReactElement } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel)

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: '8px',
    },
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary)

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails)

interface Props {
  title: string
  linkComponent?: ReactElement
  contentComponent?: ReactElement
}

export default function CustomizedExpansionPanels({
  title,
  linkComponent,
  contentComponent,
}: Props) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{title}</Typography>
        <Typography>-</Typography>
        {linkComponent}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {contentComponent}
        {/* <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
