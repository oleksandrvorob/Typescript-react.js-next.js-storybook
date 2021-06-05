import _pickBy from 'lodash/pickBy'
import { useSession } from 'next-auth/client'
import { createContext, FunctionComponent, useContext, useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'

import { useConfirm } from 'material-ui-confirm'

import { post } from 'lib/fetch'
import { AppContext } from 'lib/appContext'

import { LoanContract } from 'entities/LoanContract'

import useDrawCalc, { DrawCalcProps } from 'hooks/useDrawCalc'

import {
  DrawRequest,
  DrawRequestGetResponse,
  Inspection,
  FciGetResponse,
  LoanContractDrawInfo,
  LoanContractDrawInfoGetResponse,
} from 'lib/interfaces'

interface Context {
  drawData: [DrawRequest, Error]
  inspectionData: [Inspection[], Error]
  // loanDrawData: [LoanContractDrawInfo, Error]
  loanContractData: [LoanContract, Error]
  approvedInspection: Inspection
  activeInspection: Inspection
  drawCalcData: DrawCalcProps
  loadingDrawCalc: boolean
  isExec: boolean
  onSubmitInspection: (data: Partial<Inspection>) => void
  onEditInspection: (inspectionId: string, data: Partial<Inspection>) => void
  onEditDrawRequest: (data: Partial<Inspection>) => void
  onUndo: (drawRequest: DrawRequest, inspection: Inspection) => void
  loading: boolean
}

export const DrawRequestContext = createContext<Context | undefined>(undefined)

interface Props {
  loanId: number
  drawNumber: number
}

const Store: FunctionComponent<Props> = ({ loanId, drawNumber, children }) => {
  const [loading, setLoading] = useState(false)
  const { setMessage } = useContext(AppContext)
  const [session] = useSession()
  const confirm = useConfirm()

  const user = session ? session?.user : { permissions: [] }

  // @ts-ignore
  const isExec = user?.permissions ? user.permissions.includes('exec') : false

  const { data: loanContract, error: loanContractError } = useSWR<LoanContract>(
    loanId && `/api/v1/loan-contracts/${loanId}`,
  )

  const { data: drawData, error: drawError } = useSWR<DrawRequestGetResponse>(
    drawNumber && `/api/loancontract/${loanId}/draw-requests/${drawNumber}`,
  )

  const { data: inspections, error: inspectionsError } = useSWR<Inspection[]>(
    () => `/api/draw-requests/${drawData.drawRequest.id}/inspections`,
  )

  const loadingLoanData = !loanContract && !loanContractError
  // const loadingLoanDrawData = !loanDrawData && !loanDrawDataError
  const loadingDrawData = !drawData && !drawError
  const loadingInspections = !inspections && !inspectionsError
  // const loadingServicingData = !servicingData && !fciError

  const [loadingDrawCalc, setLoadingDrawCalc] = useState(loadingDrawData || loadingInspections)

  useEffect(() => {
    setLoadingDrawCalc(loadingDrawData || loadingInspections)
  }, [loadingDrawData, loadingInspections])

  const refresh = () => {
    setLoadingDrawCalc(true)
    // TODO: this seems sort of not efficient
    mutate(`/api/v1/loan-contract/${loanId}`)
    mutate(`/api/draw-requests/${drawData.drawRequest.id}/inspections`)
    mutate(`/api/loancontract/${loanId}/draw-requests/${drawNumber}`)
    setLoadingDrawCalc(false)
  }

  const postInspectionForm = async (data) => {
    try {
      await post(
        `/api/draw-requests/${drawData.drawRequest.id}/inspections`,
        JSON.stringify(data),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      refresh()
    } catch (e) {
      setMessage(e, 'error')
    }
  }

  const patchInspectionForm = async (inspectionId: string, data: Partial<Inspection>) => {
    setLoading(true)
    try {
      await post(`/api/inspections/${inspectionId}`, JSON.stringify(data), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      setMessage(e, 'error')
    }

    setLoading(false)

    refresh()
  }

  const patchDrawRequest = async (data) => {
    setLoading(true)
    try {
      await post(`/api/draw-requests/${drawData.drawRequest.id}`, JSON.stringify(data), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      setMessage(e, 'error')
    }

    setLoading(false)

    refresh()
  }

  const onSubmitInspection = (data: Partial<Inspection>) => {
    postInspectionForm(data)
  }

  const onEditInspection = (inspectionId: string, data: Partial<Inspection>) => {
    patchInspectionForm(inspectionId, data)
  }

  const onEditDrawRequest = (data: Partial<DrawRequest>) => {
    patchDrawRequest(data)
  }

  const onUndo = (drawRequest: DrawRequest, inspection: Inspection) => {
    switch (drawRequest?.status) {
      case 'inspection approved':
        confirm({ description: 'This will remove approved status from inspection.' }).then(() => {
          drawRequest.status = 'inspection ordered'
          patchDrawRequest(drawRequest)

          inspection.status = 'ordered'
          inspection.approvedDate = null
          patchInspectionForm(inspection.id, inspection)
        })

        break
      case 'approved':
        confirm({
          description: 'This will undo the draw request approval.',
        }).then(() => {
          drawRequest.approvedAmount = null
          drawRequest.approvedDate = null
          drawRequest.status = 'inspection approved'
          patchDrawRequest(drawRequest)
        })

        break

      default:
        return null
    }
  }

  // Filter inspections by predicating status as approved
  const approvedInspections =
    inspections && inspections.filter((item) => item.status === 'approved')

  // Filter inspections by predicating active as true
  const activeInspections = inspections && inspections.filter((item) => item.active === true)

  // Is there an approved inspection?
  const approvedInspection = approvedInspections?.[0] ?? null
  const activeInspection = activeInspections?.[0] ?? null

  const drawCalcData = useDrawCalc(
    // loanDrawData?.loanContractDrawInfo,
    loanContract,
    drawData?.drawRequest,
    approvedInspection,
  )

  const store: Context = {
    drawData: [drawData?.drawRequest, drawError],
    inspectionData: [inspections, inspectionsError],
    loanContractData: [loanContract, loanContractError],
    // loanDrawData: [loanDrawData?.loanContractDrawInfo, loanDrawDataError],
    approvedInspection,
    activeInspection,
    drawCalcData,
    loadingDrawCalc,
    onSubmitInspection,
    onEditInspection,
    onEditDrawRequest,
    isExec,
    onUndo,
    loading,
  }

  return <DrawRequestContext.Provider value={store}>{children}</DrawRequestContext.Provider>
}

function useDrawRequest() {
  const context = useContext(DrawRequestContext)
  if (context === undefined) {
    throw new Error('useDrawRequest must be used within a DrawRequestContext Provider')
  }
  return context
}

export { useDrawRequest }

export default Store
