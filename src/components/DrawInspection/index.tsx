import { FunctionComponent, useState } from 'react'

import Typography from '@material-ui/core/Typography'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import StatRow from 'components/atoms/StatRow'
import StatY from 'components/atoms/StatY'
import OutlinedFab from 'components/atoms/OutlinedFab'
import Dialog from 'components/atoms/Dialog'

import CenteredStack from 'components/CenteredStack'
import Form from './Edit'

import { getTimeStamp } from 'lib/utils'
import { Inspection } from 'lib/interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    header: (props: Partial<Inspection>) => {
      const color =
        props.status == 'approved' ? theme.palette.info.light : theme.palette.warning.light

      return {
        background: color,
        paddingLeft: theme.spacing(1),
      }
    },
    wrapper: (props: Partial<Inspection>) => {
      const color =
        props.status == 'approved' ? theme.palette.info.light : theme.palette.warning.light

      return {
        borderLeft: `1px solid ${color}`,
        borderRight: `1px solid ${color}`,
        borderTop: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
        borderRadius: theme.shape.borderRadius,
      }
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // maxWidth: '500px',
      padding: theme.spacing(2),
      '& > * + *': {
        marginLeft: theme.spacing(0.2),
      },
    },
  }),
)

interface Props extends Inspection {
  canEdit: boolean
  onSubmit: (inspectionId: string, data: Partial<Inspection>) => void
}

const InspectionComponent: FunctionComponent<Props> = ({
  id,
  status,
  orderedDate,
  eta,
  receivedDate,
  inspectionDate,
  completePercentage,
  vendor,
  canEdit,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false)
  const styles = useStyles({ status })

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography style={{ color: 'white' }}>{vendor?.name}</Typography>
        </div>

        <div className={styles.content}>
          <OutlinedFab size="small" onClick={() => setOpen(true)} disabled={!canEdit}>
            <EditTwoToneIcon color={canEdit ? 'primary' : 'disabled'} />
          </OutlinedFab>
          <CenteredStack>
            <StatRow>
              <StatY label="ordered date" value={getTimeStamp(orderedDate)} />
              <StatY label="ETA" value={getTimeStamp(eta)} />
              <StatY label="received date" value={getTimeStamp(receivedDate)} />
            </StatRow>
            <StatRow>
              <StatY label="inspection date" value={getTimeStamp(inspectionDate)} />
              <StatY label="% complete" value={completePercentage?.toString()} />
            </StatRow>
          </CenteredStack>

          <Dialog title="Edit Inspection" open={open} handleClose={() => setOpen(false)}>
            <Form
              inspectionId={id}
              status={status}
              receivedDate={receivedDate}
              orderedDate={orderedDate}
              inspectionDate={inspectionDate}
              completePercentage={completePercentage}
              onSubmit={(data) => {
                setOpen(false)
                onSubmit(id, data)
              }}
            />
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default InspectionComponent
