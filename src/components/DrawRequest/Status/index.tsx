import { FC } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import ApprovalForm from 'components/DrawRequest/ApprovalForm'
import DisbursementForm from 'components/DrawRequest/DisbursementForm'
import Stepper from './Stepper'

import { DrawRequest, Inspection } from 'lib/interfaces'

const FinalForm: FC<{
  requestedAmount: string
  approvedAmount: string
  wireFee: string
  inspectionFee: string
  disbursedDate: Date
  status: string
  eligibleDisbursementAmount: number
  onSubmit: (data: Partial<DrawRequest>) => void
}> = (props) => {
  switch (props?.status) {
    case 'inspection approved':
      return <ApprovalForm {...props} />
    case 'approved':
      return <DisbursementForm {...props} />
    default:
      return null
  }
}

const DrawRequestStatus: FC<{
  drawRequest: DrawRequest
  inspection?: Inspection
  allowedAmount: number
  onApprove: (data: Partial<DrawRequest>) => void
  onUndo: (drawRequest: DrawRequest, inspection: Inspection) => void
}> = ({ drawRequest, inspection, allowedAmount, onApprove, onUndo }) => {
  const showApproval =
    !!drawRequest && ['inspection approved', 'approved'].includes(drawRequest?.status)

  const funded = Boolean(drawRequest?.status === 'funded')

  return (
    <Card>
      <CardHeader
        title="Status"
        titleTypographyProps={{ variant: 'subtitle2', color: 'textSecondary' }}
        action={
          <>
            {showApproval && (
              <Button
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                size="small"
                onClick={() => onUndo(drawRequest, inspection)}
                style={{ marginRight: '8px' }}
              >
                Previous
              </Button>
            )}

            <Button
              disabled={funded}
              variant="outlined"
              size="small"
              // onClick={() => setConfirmDialogOpen(true)}
              endIcon={<BackspaceOutlinedIcon />}
            >
              hold
            </Button>
          </>
        }
      />
      <CardContent>
        {drawRequest && <Stepper drawRequest={drawRequest} inspection={inspection} />}
        {showApproval && (
          <FinalForm
            eligibleDisbursementAmount={allowedAmount}
            requestedAmount={drawRequest.requestedAmount}
            approvedAmount={drawRequest.approvedAmount}
            wireFee={drawRequest.wireFee}
            inspectionFee={drawRequest.inspectionFee}
            disbursedDate={drawRequest.disbursedDate}
            status={drawRequest.status}
            onSubmit={onApprove}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default DrawRequestStatus
