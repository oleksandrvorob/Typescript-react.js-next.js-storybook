import { NextApiRequest } from 'next'
import { Order } from './types'

export interface ApiQuery {
  searchTerm?: string
  page: number
  order: Order
  orderBy: string
  rowsPerPage: number
  filters?: string[][] | NextApiRequest['query']
}

// used for tables
export interface Column {
  id: string
  numeric: boolean
  disablePadding: boolean
  label: string
  type: string
}

export interface DrawRequest {
  id: string
  drawNumber: number
  loanId: number
  status: string
  requestedDate: Date
  approvedDate: Date
  fundedDate: string
  requestedAmount: string
  approvedAmount: string
  approvedAmountToDate: string
  disbursedDate: Date
  inspectionFee: string
  wireFee: string
  active: boolean
}

export interface DrawRequestGetResponse {
  drawRequest: DrawRequest
}

export interface InspectionVendor {
  id: number
  name: string
}

export interface Inspection {
  id: string
  status: string
  orderedDate: Date
  eta: Date
  receivedDate: Date
  inspectionDate: Date
  completePercentage: number
  approvedDate: Date
  vendorId: number
  active: boolean
  vendor: InspectionVendor
}

export interface Fci {
  loanId: number
  status: string
  assignment: string
  updatedAt: string
}

export interface FciGetResponse {
  fci: Fci
}

export interface LoanContract {
  lid: string
  number: string
  borrowerName: string
  amount: string
  fullAddress: string
  fciLoanId: number
}

export interface LoanContractGetResponse {
  loanContract: LoanContract
}

export interface LoanContractDrawInfo {
  approvedHoldback: string
  rehabBudget: string
  address: string
  city: string
  state: string
}

export interface LoanContractDrawInfoGetResponse {
  loanContractDrawInfo: LoanContractDrawInfo
}

export interface InspectionVendor {
  id: number
  name: string
}

export interface InspectionVendorListResponse {
  inspectionVendors: InspectionVendor[]
}
