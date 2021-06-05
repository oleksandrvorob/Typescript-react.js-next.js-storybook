import { createContext, FunctionComponent, useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import { useConfirm } from 'material-ui-confirm'

// import { LoanContract } from 'entities/LoanContract'
import useLoanContracts, { LoanContractStore } from 'hooks/useLoanContracts'

interface Context {
  loanContractData: LoanContractStore
  address: string
  setAddress: (address: string) => void
}

export const DrawReimbursementContext = createContext<Context | undefined>(undefined)

const Store: FunctionComponent = ({ children }) => {
  // const router = useRouter()
  const loanContractData = useLoanContracts({ filters: [['accountingOpen_is', 'true']] })
  const [address, setAddress] = useState<string | null>()
  // const confirm = useConfirm()
  // const pageSize = 5

  // const setAddress = useCallback(
  //   (address: string) => {
  //     const url = `${window.location.pathname}?${new URLSearchParams({ address })}`
  //     router.replace(url, url, { shallow: true })
  //     _setAddress(address)
  //   },
  //   [router],
  // )

  return (
    <DrawReimbursementContext.Provider
      value={{
        loanContractData,
        address,
        setAddress,
      }}
    >
      {children}
    </DrawReimbursementContext.Provider>
  )
}

function useDrawReimbursementStore() {
  const context = useContext(DrawReimbursementContext)
  if (context === undefined) {
    throw new Error('useAccountingStore must be used within a DrawReimbursementContext Provider')
  }
  return context
}

export { useDrawReimbursementStore }

export default Store
