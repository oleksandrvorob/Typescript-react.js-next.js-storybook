import { FunctionComponent, useState } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

import { LoanContract } from 'entities/LoanContract'
import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'
import { getFloat } from 'lib/utils'

// my components
import Dialog from 'components/atoms/Dialog'

import ReimbursementRow from './ReimbursementRow'
import ReimbursementForm from './ReimbursementForm'

interface Props {
  loanContracts: LoanContract[]
  submitReimbursement: (loanId: number, data: Partial<DrawRequestReimbursement>) => void
}

const Reimbursements: FunctionComponent<Props> = ({ loanContracts, submitReimbursement }) => {
  const [open, setOpen] = useState(false)
  const [loanContract, setLoanContract] = useState<LoanContract | null>(null)

  const handleOpen = (loanContract: LoanContract) => {
    setLoanContract(loanContract)
    setOpen(true)
  }

  const handleClose = () => {
    setLoanContract(null)
    setOpen(false)
  }

  const handleSubmit = (data: Partial<DrawRequestReimbursement>) => {
    submitReimbursement(loanContract.id, data)
    handleClose()
  }

  // const fundedTotal = drawRequests
  //   .map((val) => getFloat(val.approvedAmount))
  //   .reduce((prev, curr) => prev + curr, 0)

  // const reimbursedTotal = drawRequests
  //   .map((val) => getFloat(val.reimbursedAmount))
  //   .reduce((prev, curr) => prev + curr, 0)

  return (
    <>
      <Table>
        <TableBody>
          {loanContracts.map((loanContract) => (
            <ReimbursementRow
              loanContract={loanContract}
              onClick={() => handleOpen(loanContract)}
            />
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} handleClose={() => handleClose()} title="Enter Reimbursement">
        {loanContract && (
          <ReimbursementForm
            onSubmit={handleSubmit}
            onCancel={handleClose}
            loanContract={loanContract}
          />
        )}
      </Dialog>
    </>
  )
}

export default Reimbursements
