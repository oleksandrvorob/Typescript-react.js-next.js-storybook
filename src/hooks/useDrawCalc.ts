import { LoanContract } from 'entities/LoanContract'

import {
  DrawRequest,
  Inspection,
} from 'lib/interfaces'

import { getFloat } from 'lib/utils'

export interface DrawCalcProps {
  approvedHoldback: number
  rehabBudget: number
  borrowerShare: number
  requestedAmount: number
  eligibleAmount: number
  completePercentage: number
  allowedAmount: number
  approvedAmountToDate: number
  disbursedAmount: number
  disbursedAmountWithCurrent: number
}

const useDrawCalc = (
  loanContract: LoanContract,
  drawRequest: DrawRequest,
  approvedInspection: Inspection,
): DrawCalcProps => {
  const approvedHoldback = getFloat(loanContract?.approvedHoldback)
  const rehabBudget = getFloat(loanContract?.rehabBudget)

  const borrowerShare = rehabBudget - approvedHoldback
  const completePercentage = approvedInspection?.completePercentage

  const requestedAmount = getFloat(drawRequest?.requestedAmount)
  const approvedAmountToDate = getFloat(drawRequest?.approvedAmountToDate)

  // All previously funded draws
  const fundedDraws = loanContract?.drawRequests?.filter(x => x.status === 'funded' && x.drawNumber < drawRequest?.drawNumber)

  const disbursedAmount = fundedDraws?.reduce((a, b) => {
    return a + getFloat(b.approvedAmount)
  }, 0)

  const disbursedAmountWithCurrent = getFloat(drawRequest?.approvedAmount) + disbursedAmount

  const whereDisbursedShouldBe = approvedHoldback * (completePercentage / 100)

  const eligibleAmount = whereDisbursedShouldBe - (approvedAmountToDate || 0)

  const whereDisbursedIsCurrently = approvedAmountToDate

  const holdbackDiff = whereDisbursedShouldBe - whereDisbursedIsCurrently

  const allowedAmount =
    holdbackDiff > 0 && holdbackDiff > requestedAmount ? requestedAmount : holdbackDiff

  return {
    approvedHoldback,
    rehabBudget,
    borrowerShare,
    requestedAmount,
    eligibleAmount,
    completePercentage,
    allowedAmount,
    approvedAmountToDate,
    disbursedAmount,
    disbursedAmountWithCurrent
  }
}

export default useDrawCalc