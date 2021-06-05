import { createContext, Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react'
import { useConfirm } from 'material-ui-confirm'

import { DrawRequest } from 'entities/DrawRequest'
import useDrawRequests, { DrawRequestStore } from 'hooks/useDrawRequests'

interface Context {
  drawRequestData: DrawRequestStore
  undoFunding: (drawRequestId: string) => void
  approvedDrawRequests: DrawRequest[]
  fundedDrawRequests: DrawRequest[]
  fundedCount: number
  setPage: Dispatch<SetStateAction<number>>
  pageCount: number
}

export const AccountingContext = createContext<Context | undefined>(undefined)

const Store: FunctionComponent = ({ children }) => {
  const [page, setPage] = useState(1)
  const drawRequestData = useDrawRequests()
  const confirm = useConfirm()
  const pageSize = 5

  const { drawRequests } = drawRequestData

  const approvedDrawRequests = drawRequests.filter((item) => item.status === 'approved')
  let fundedDrawRequests = drawRequests.filter((item) => item.status === 'funded')

  const fundedCount = fundedDrawRequests.length

  const pageCount = Math.ceil(fundedCount / pageSize)
  // pagination
  const cursor = (page - 1) * pageSize
  fundedDrawRequests = fundedDrawRequests.sort((a, b) => (a.loanId < b.loanId ? 1 : -1)).slice(cursor, page * pageSize)

  const undoFunding = (drawRequestId: string) => {
    confirm({ description: 'This will revert the draw request to approved status.' }).then(() => {
      drawRequestData.patchDrawRequest(drawRequestId, { disbursedDate: null, status: 'approved' })
    })
  }

  return (
    <AccountingContext.Provider value={{ drawRequestData, undoFunding, approvedDrawRequests, fundedDrawRequests, fundedCount, setPage, pageCount }}>
      {children}
    </AccountingContext.Provider>
  )
}

function useAccountingStore() {
  const context = useContext(AccountingContext)
  if (context === undefined) {
    throw new Error('useAccountingStore must be used within a AccountingContext Provider')
  }
  return context
}

export { useAccountingStore }

export default Store
