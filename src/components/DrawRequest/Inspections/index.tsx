import { FunctionComponent, useState } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { Inspection as InspectionInterface } from 'lib/interfaces'

import AddButton from 'components/atoms/AddButton'
import Inspection from 'components/DrawInspection'
import InspectionForm from 'components/DrawRequest/InspectionCreateForm'

import Container from './Container'

interface Props {
  inspections: InspectionInterface[]
  drawStatus: string
  drawRequestId: string
  onEdit: (inspectionId: string, data: Partial<InspectionInterface>) => void
  onCreate: (data: Partial<InspectionInterface>) => void
}

const Inspections: FunctionComponent<Props> = ({
  inspections,
  drawStatus,
  onEdit,
  onCreate,
  drawRequestId,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const held = drawStatus === 'held'
  const approved = ['inspection approved', 'approved'].includes(drawStatus)
  const funded = drawStatus === 'funded'

  return (
    <>
      <Card>
        <CardHeader
          title="Inspections"
          titleTypographyProps={{ variant: 'subtitle2', color: 'textSecondary' }}
          action={
            inspections?.length ? null : (
              <AddButton
                color="primary"
                disabled={held}
                onClick={() => setOpen(true)}
                size="small"
                tooltip="Create New Inspection"
              />
            )
          }
        />
        <CardContent>
          <Container>
            {inspections &&
              inspections?.map((item, index) => (
                <Inspection
                  key={index}
                  {...item}
                  onSubmit={onEdit}
                  canEdit={!held && !approved && !funded}
                />
              ))}
          </Container>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} disableBackdropClick>
        <DialogTitle id="max-width-dialog-title">Create New Inspection</DialogTitle>
        {drawRequestId && (
          <InspectionForm
            onCancel={() => setOpen(false)}
            onSubmit={(data) => {
              onCreate(data)
              setOpen(false)
            }}
          />
        )}
      </Dialog>
    </>
  )
}

export default Inspections
