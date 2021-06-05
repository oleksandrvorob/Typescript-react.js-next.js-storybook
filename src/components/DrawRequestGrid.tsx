import { FunctionComponent } from 'react'
import { LicenseInfo, XGrid, XGridProps } from '@material-ui/x-grid'

import { DrawRequest } from 'entities/DrawRequest'
import { getTimeStamp, getFloat, formatMoney } from 'lib/utils'

LicenseInfo.setLicenseKey(process.env.MUIX_LICENCE)

interface Props extends Omit<XGridProps, 'columns' | 'rows'> {
  drawRequests: DrawRequest[]
}

const getWireOut = (data: DrawRequest) => {
  return formatMoney(
    getFloat(data.approvedAmount) - getFloat(data.wireFee) - getFloat(data.inspectionFee),
  )
}

const DrawRequestGrid: FunctionComponent<Props> = ({ drawRequests, ...props }) => {
  const fields = [
    // lc fields
    {
      field: 'lid',
      headerName: 'LID',
      width: 150,
      valueGetter: ({ data }) => data.loanContract.lid,
    },
    { field: 'drawNumber', headerName: 'Draw Number', width: 120 },
    {
      field: 'assignment',
      headerName: 'Assignment',
      width: 150,
      valueGetter: ({ data }) => data.loanContract?.fci?.lenderName ?? 'Quanta Finance, LLC',
    },
    {
      field: 'address',
      headerName: 'Address Street Line 1',
      width: 200,
      valueGetter: ({ data }) => data?.loanContract?.address?.streetLine1,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      valueGetter: ({ data }) => data?.loanContract?.address?.city,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 80,
      valueGetter: ({ data }) => data?.loanContract?.address?.state,
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      width: 100,
      valueGetter: ({ data }) => data?.loanContract?.address?.zipCode,
    },
    { field: 'approvedAmount', headerName: 'Approved Amount', width: 150 },
    { field: 'wireFee', headerName: 'Wire Fee', width: 120 },
    { field: 'inspectionFee', headerName: 'Inspection Fee', width: 120 },
    {
      field: 'netWireOutAmount',
      headerName: 'Net Wire Amount',
      width: 120,
      valueGetter: ({ data }) => getWireOut(data),
    },
    {
      field: 'rehabBudget',
      headerName: 'Rehab Budget',
      width: 120,
      valueGetter: ({ data }) => data.loanContract.rehabBudget,
    },
    {
      field: 'approvedHoldback',
      headerName: 'Approved Holdback',
      width: 120,
      valueGetter: ({ data }) => data.loanContract.approvedHoldback,
    },
    { field: 'status', headerName: 'Draw Status', width: 120 },
    // draw request fields
    // { field: 'active', headerName: 'active' },
    { field: 'approvedAmountToDate', headerName: 'Approved Amount To Date', width: 150 },
    { field: 'approvedDate', headerName: 'Approved Date', type: 'dateTime', width: 150 },
    { field: 'disbursedDate', headerName: 'Disbursed Date', type: 'dateTime', width: 150 },
    // { field: 'id', headerName: 'Id', width: 150 },
    // { field: 'loanId', headerName: 'Loan Id', width: 150 },
    { field: 'manualDrawId', headerName: 'Manual Draw Id', width: 120 },
    { field: 'notes', headerName: 'Notes', width: 120 },
    { field: 'reimbursedAmount', headerName: 'Reimbursed Amount', width: 150 },
    { field: 'reimbursedDate', headerName: 'Reimbursed Date', type: 'dateTime', width: 150 },
    { field: 'requestedAmount', headerName: 'Requested Amount', width: 150 },
    {
      field: 'requestedDate',
      headerName: 'Requested Date',
      width: 150,
      valueGetter: ({ data }) => getTimeStamp(data.requestedDate),
    },
  ]

  return (
    <div style={{ width: '100%', height: 400 }}>
      <XGrid
        rows={drawRequests}
        columns={fields}
        loading={drawRequests?.length === 0}
        // disableExtendRowFullWidth
        // checkboxSelection
        pagination
        {...props}
      />
    </div>
  )
}

export default DrawRequestGrid
