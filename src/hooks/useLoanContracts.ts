import { Dispatch, SetStateAction, useCallback, useContext, useState } from 'react'
import useSWR from 'swr'
import { useConfirm } from 'material-ui-confirm'

// entities
import { LoanContract } from 'entities/LoanContract'
import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'

// utils
import post from 'utils/postRequest'
import { AppContext } from 'lib/appContext'
import { useDebounce, useQuery } from 'lib/hooks'
import { ApiQuery } from 'lib/interfaces'

type LoanContractResponse = [LoanContract[], number]

export interface LoanContractStore {
  loanContracts: LoanContract[]
  loanContractsCount: number
  loadingLoanContracts: boolean
  postReimbursement: (loanContractId: number, data: Partial<DrawRequestReimbursement>) => void
  address: string | null
  setAddress: (address: string) => void
  closeLoan: (loanContractId: number) => void
  query: Partial<ApiQuery>
  setQuery: (obj: Partial<ApiQuery>) => void
}

const useLoanContracts = ({ page = 0, rowsPerPage = 5, filters = [] }) => {
  const confirm = useConfirm()
  const [query, setQuery, queryString] = useQuery({ page, rowsPerPage, filters })

  const [address, _setAddress] = useState<string | null>()

  const [loading, setLoading] = useState(false)
  const { setMessage, drawerStats } = useContext(AppContext)

  const base = '/api/v1/loan-contracts'

  const setAddress = useCallback((address: string) => {
    setQuery({ page: 0 })
    _setAddress(address)
  }, [])

  const { data, error, isValidating, mutate } = useSWR<LoanContractResponse>(`${base}?${queryString}`)
  const { mutateDrawerStats } = drawerStats

  const [loanContracts, loanContractsCount] = data ? data : [[], 0]

  const postReimbursement = async (
    loanContractId: number,
    data: Partial<DrawRequestReimbursement>,
  ) => {
    setLoading(true)

    try {
      await post(`/api/v1/loan-contracts/${loanContractId}/reimbursements`, JSON.stringify(data), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      mutate()
      mutateDrawerStats()

    } catch (e) {
      console.error(e)
      setMessage(e, 'error')
    } finally {
      setLoading(false)
    }
  }

  const patchDrawRequest = async (loanContractId: number, data: Partial<LoanContract>) => {
    setLoading(true)

    try {
      await post(`/api/v1/loan-contracts/${loanContractId}`, JSON.stringify(data), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      console.error(e)
      setMessage(e, 'error')
      setLoading(false)
    }

    mutate()
    mutateDrawerStats()
    setLoading(false)
  }

  const closeLoan = (loanContractId: number) => {
    confirm({ description: 'This will mark transaction status of loan as closed.' }).then(() => {
      patchDrawRequest(loanContractId, { accountingOpen: false })
    })
  }

  const loadingLoanContracts = (!data && !error) || loading

  // const deleteReimbursement = async (id: number) => {
  //   try {
  //     await post(`/api/v1/draw-request-reimbursements/${id}/`, JSON.stringify({}), {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     mutate()
  //     mutateDrawerStats()
  //   } catch (e) {
  //     console.error(e)
  //     setMessage(e, 'error')
  //   }
  // }



  return {
    loanContracts,
    loanContractsCount,
    loadingLoanContracts,
    postReimbursement,
    page,
    query,
    setQuery,
    address,
    setAddress,
    closeLoan
  }
}

export default useLoanContracts
