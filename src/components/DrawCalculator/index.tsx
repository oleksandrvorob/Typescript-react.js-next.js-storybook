import { FunctionComponent } from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'

import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { formatMoney } from 'lib/utils'
import Stack from 'components/Stack'
import StatPrimary from 'components/atoms/StatPrimary'

import { DrawCalcProps } from 'hooks/useDrawCalc'

const Flex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

interface StatFlexProps {
  label: string
  caption?: string
  value: string | number
  fontWeight?: 'bold' | 'normal'
}

const StatFlex: FunctionComponent<StatFlexProps> = ({
  label,
  caption = '',
  value,
  fontWeight = 'bold',
}) => {
  return (
    <Flex>
      <div>
        <Typography variant="subtitle2" style={{ fontWeight }}>
          {label}
        </Typography>
        <Typography variant="caption">{caption}</Typography>
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
          {!!value ? value : '-'}
        </Typography>
      </div>
    </Flex>
  )
}

const getStatusMessages = (severity) => {
  switch (severity) {
    case 'error':
      return 'Do not fund draw request when the allowed amount is at or below $0.'
    case 'warning':
      return 'Allowed amount is less than the requested amount. To approve requested amount, manager approval will be required.'
    case 'info':
      return 'Pending inspection approval'
    default:
      null
  }
}

interface Props extends DrawCalcProps {
  loading: boolean
  status: string
}

const DrawCalc: FunctionComponent<Props> = (props) => {
  const {
    approvedHoldback,
    rehabBudget,
    borrowerShare,
    requestedAmount,
    eligibleAmount,
    completePercentage,
    allowedAmount,
    disbursedAmount,
    disbursedAmountWithCurrent,
    status,
  } = props

  const getPercent = (num1: number, num2: number) => `${Math.round(100 * (num1 / num2))}%`

  const approvedHoldbackPercentage =
    approvedHoldback && rehabBudget ? getPercent(approvedHoldback, rehabBudget) : '-'

  const remainingHoldback = approvedHoldback - disbursedAmount
  const reminingHoldbackAfter = approvedHoldback - disbursedAmountWithCurrent

  // this is hideous haahaha
  const severity = ['new', 'inspection ordered'].includes('status')
    ? 'info'
    : !allowedAmount || allowedAmount <= 0
    ? 'error'
    : allowedAmount < requestedAmount
    ? 'warning'
    : 'success'

  return (
    <Stack>
      <div>
        <StatFlex label="Original Budget" value={formatMoney(rehabBudget)} />
        <StatFlex label="Approved Holdback (HB)" value={formatMoney(approvedHoldback)} />
        <StatFlex label="Borrower's Share of Rehab" value={formatMoney(borrowerShare)} />
        <StatFlex label="Approved HB %" value={approvedHoldbackPercentage} />
      </div>
      <Divider />
      <div>
        <Stack space="8px">
          <StatFlex
            label="Project Completed"
            caption="(per Current Inspection)"
            value={completePercentage ? `${completePercentage?.toString()}%` : null}
          />
          <StatFlex
            label="Remaining Holdback"
            value={formatMoney(remainingHoldback)}
            caption="(At time of request)"
          />
          <StatFlex label="Draw Req Amount" value={formatMoney(requestedAmount)} />
        </Stack>
        <StatFlex label="Eligible Disbursement" value={formatMoney(eligibleAmount)} />
      </div>
      <Divider />
      <StatPrimary
        label="Draw Amount Allowed"
        value={formatMoney(allowedAmount)}
        variant="h5"
        color={severity === 'error' ? 'error' : 'textSecondary'}
        popoverMessage={getStatusMessages(severity)}
      />
      <Divider />
      <div>
        <StatFlex label="" caption="Rehab Disbursed Amount" value={formatMoney(disbursedAmount)} />
        <StatFlex
          label=""
          caption="Rehab Disbursed Pctg."
          value={getPercent(disbursedAmount, approvedHoldback)}
        />
      </div>
      {status === 'funded' && (
        <>
          <Divider />
          <Box marginLeft="auto" marginRight="auto">
            <Typography variant="caption">(Including Current)</Typography>
          </Box>
          <div>
            <StatFlex
              label=""
              caption="Rehab Disbursed Amount"
              value={formatMoney(disbursedAmountWithCurrent)}
            />
            <StatFlex
              label=""
              caption="Rehab Disbursed Pctg."
              value={getPercent(disbursedAmountWithCurrent, approvedHoldback)}
            />
            <StatFlex
              label=""
              caption="Remaining Holdback"
              value={formatMoney(reminingHoldbackAfter)}
            />
          </div>
        </>
      )}
    </Stack>
  )
}

export default DrawCalc
