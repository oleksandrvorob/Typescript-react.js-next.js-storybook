import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TaskLink from 'components/TaskLink'

import titleCase from 'lib/utils/titleCase'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    '&:first-child': {
      borderTop: 0
    },
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
    '&:not($expanded)': {
      borderBottom: 0,
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const CustomizedAccordions: React.FC<{
  activeSection: string,
  activeTask: string
  setActiveTask: (activeSection: string, activeTask: string) => void
}> = ({ activeSection, activeTask, setActiveTask }) => {
  const [expanded, setExpanded] = React.useState<string | false>(activeSection);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const isExpanded = (sectionName) => activeSection === sectionName || expanded === sectionName
  const isDisabled = (sectionName) => sectionName === activeSection

  React.useEffect(() => {
    setExpanded(activeSection)
  }, [activeSection])

  const TASKS = [
    "application-details/provide-flip-details",
    "application-details/upload-initial-application",
    "property-information/upload-purchase-contract",
    "property-information/provide-property-details",
    "rehab-information/project-summary",
    "rehab-information/scope-of-work-details",
    "third-party-information/provide-closing-agent-information",
    "third-party-information/upload-prelim-title",
    "borrower-information/provide-entity-information",
    "guarantor-information/provide-guarantor-personal-information",
    // "appraisal-information/upload-completed-appraisal"
  ]

  const tasks = TASKS.reduce((running, current) => {
    const [section, task] = current.split('/')

    if (section in running) {
      running[section].push(task)
    } else {
      running[section] = [task]
    }

    return running
  }, {})

  return (
    <div>
      {Object.entries(tasks).map(([section, taskItems]) => {
        const sectionLabel = titleCase(section.replace(/-/g, " "))
        return (
          <Accordion square expanded={isExpanded(section)} onChange={handleChange(section)}>
            <AccordionSummary aria-controls={`${section}-content`} id={`${section}-header`} disabled={isDisabled(section)}>
              <Typography>{sectionLabel}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
              <Box display="flex" flexDirection="column" width="100%">
                {(taskItems as string[]).map((taskItem) => {
                  const taskLabel = titleCase(taskItem.replace(/-/g, " "))
                  return <TaskLink label={taskLabel} onClick={() => setActiveTask(section, taskItem)} active={activeTask === taskItem} />
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  );
}

export default CustomizedAccordions