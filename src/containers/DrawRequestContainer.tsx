import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'

// MUI components
import IconButton from '@material-ui/core/IconButton'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import CloudDownloadTwoToneIcon from '@material-ui/icons/CloudDownloadTwoTone'

import Stack from 'components/Stack'
import SideStepper from 'components/SideStepper'
import LoaderBackdrop from 'components/LoaderBackdrop'
import Dialog from 'components/atoms/Dialog'

// Things that go in sidebar
import DrawCalculator from 'components/DrawCalculator'
import DrawHistory from 'components/DrawHistory'

// DrawRequest Parts
import Overview from 'components/DrawRequest/Overview'
import Inspections from 'components/DrawRequest/Inspections'
import Status from 'components/DrawRequest/Status'
import ExportExcel from 'components/DrawRequest/ExportExcel'
import AmountForm from 'components/DrawRequest/AmountForm'

import { useDrawRequest } from 'stores/DrawRequestStore'
import { getFloat, formatMoney } from 'lib/utils'

// import CommentSection from 'components/CommentSection'
// import Documents from 'components/Documents'

const Grid = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-gap: 16px;
`

interface Props {
  loanId: number
}

const DrawRequestContainer: FunctionComponent<Props> = ({ loanId }) => {
  const drawRequestContext = useDrawRequest()
  const [open, setOpen] = useState(false)

  const {
    drawCalcData,
    loadingDrawCalc,
    drawData,
    loanContractData,
    inspectionData,
    approvedInspection,
    activeInspection,
    // loanDrawData,
    onSubmitInspection,
    onEditInspection,
    onEditDrawRequest,
    onUndo,
    loading,
  } = drawRequestContext

  const inspection = approvedInspection || activeInspection

  const [drawRequest] = drawData
  const [loanContract] = loanContractData
  const [inspections] = inspectionData

  const address = loanContract?.address?.streetLine1
  const city = loanContract?.address?.city
  const state = loanContract?.address?.state

  const showExport = drawRequest?.id && ['funded', 'approved'].includes(drawRequest?.status)
  const netWireOut =
    (getFloat(drawRequest?.approvedAmount) || 0) -
    (getFloat(drawRequest?.inspectionFee) || 0) -
    (getFloat(drawRequest?.wireFee) || 0)

  if (!drawRequest || !loanContract) {
    return <LoaderBackdrop open />
  }

  return (
    <>
      <LoaderBackdrop open={!drawRequest || !loanContract || loading} />
      <Grid>
        <Stack space="16px">
          <Overview
            drawRequest={drawRequest}
            borrowerName={loanContract?.borrowerName}
            address={address}
            city={city}
            state={state}
            actions={
              showExport ? (
                <ExportExcel
                  csvData={[
                    {
                      'Loan Number': loanContract?.lid,
                      'Asset Address - View': loanContract?.fullAddress,
                      'Draw Approved': drawRequest?.approvedAmount,
                      'Inspection Fee': drawRequest?.inspectionFee,
                      'Wire Fee': drawRequest?.wireFee,
                      'Net Wire Out': formatMoney(netWireOut),
                    },
                  ]}
                  fileName={`Draw Fees ${loanContract?.lid}`}
                />
              ) : (
                <IconButton color="primary" onClick={() => setOpen(true)}>
                  <EditTwoToneIcon />
                </IconButton>
              )
            }
          />

          <Status
            drawRequest={drawRequest}
            inspection={inspection}
            allowedAmount={drawCalcData?.allowedAmount}
            onApprove={onEditDrawRequest}
            onUndo={onUndo}
          />

          <Inspections
            inspections={inspections}
            drawStatus={drawRequest?.status}
            drawRequestId={drawRequest?.id}
            onEdit={onEditInspection}
            onCreate={onSubmitInspection}
          />
        </Stack>

        {/* Sidebar */}
        <SideStepper
          steps={[
            {
              label: 'Draw Calculator',
              component: (
                <DrawCalculator
                  {...drawCalcData}
                  loading={loadingDrawCalc}
                  status={drawRequest?.status}
                />
              ),
            },
            {
              action: (
                <IconButton
                  style={{ color: 'white', marginLeft: 'auto' }}
                  href={`/api/csv/draw-history?loanId=${loanContract.id}`}
                  download={`draw-history-${loanContract.lid}.csv`}
                >
                  <CloudDownloadTwoToneIcon />
                </IconButton>
              ),
              label: 'Draw History',
              component: <DrawHistory loanId={loanId} />,
            },
          ]}
        />
      </Grid>
      <Dialog title="Edit Requested Amount" open={open} handleClose={() => setOpen(false)}>
        <AmountForm
          requestedAmount={getFloat(drawRequest.requestedAmount)}
          onSubmit={(data) => {
            onEditDrawRequest(data)
            setOpen(false)
          }}
        />
      </Dialog>
    </>
  )
}

export default DrawRequestContainer
