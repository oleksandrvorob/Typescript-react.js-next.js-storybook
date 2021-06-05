import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { Alert } from '@material-ui/lab'
import StatRow from 'components/atoms/StatRow'
import StatX from 'components/atoms/StatX'
import StatY from 'components/atoms/StatY'
import DrawHistory from 'components/DrawHistory/HistoryEntries'
import Currency from 'components/fields/Currency'
import DateField from 'components/fields/DatePicker'
import LidField from 'components/fields/LidField'
import Flex from 'components/Flex'
import Stack from 'components/Stack'
import useDrawHistory from 'lib/hooks/useDrawHistory'
import { formatMoney, getFloat } from 'lib/utils'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import useSWR from 'swr'





const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  grid-gap: 16px;
`

interface Props {
  handleCancel: () => void
}

export default ({ handleCancel, onSubmit }) => {
  const { control, register, watch, handleSubmit, errors } = useForm()

  const lid = watch('lid')

  const { data } = useSWR(() => `api/loancontract/${lid.id}/draw`)
  const [draws] = useDrawHistory(lid?.id)

  const total =
    draws &&
    draws.filter(x => x.status === 'funded' && x?.active === true).reduce((a, b) => {
      return a + getFloat(b.approvedAmount)
    }, 0)

  const allowed = getFloat(data?.loanContractDrawInfo?.approvedHoldback) - total || 0
  const maxedOut = data?.loanContractDrawInfo && lid?.id && allowed <= 0
  const hasActive = draws?.filter((x) => x.status !== 'funded' && x.status !== 'held')?.length > 0

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <Stack>
          <Controller
            as={<LidField error={errors?.lid} />}
            control={control}
            name="lid"
            valueName="value"
            rules={{ required: true, validate: (v) => !!v?.lid }}
          />
          {data?.loanContractDrawInfo && lid?.id && (
            <>
              <StatRow>
                <StatY label="Borrower" value={data?.loanContractDrawInfo?.borrowerName} />
              </StatRow>
              <Grid>
                <StatY label="Address" value={data?.loanContractDrawInfo?.address} />
                <StatY label="Status" value={data?.loanContractDrawInfo?.transactionState} />
                <StatY label="Rehab Budget" value={data?.loanContractDrawInfo?.rehabBudget} />
                <StatY label="Approved HB" value={data?.loanContractDrawInfo?.approvedHoldback} />
              </Grid>
              <StatRow>
                <StatX label="Max Amount" value={formatMoney(allowed)} />
              </StatRow>
            </>
          )}
          {(maxedOut || hasActive) && (
            <Alert variant="outlined" severity="error">
              {maxedOut
                ? 'Cannot draw any more from this loan.'
                : 'This loan already has outstanding draw request(s).'}
            </Alert>
          )}

          <Currency
            inputRef={register({ validate: (v) => getFloat(v) <= allowed })}
            name="amount"
            label="Amount"
            disabled={maxedOut || hasActive}
            variant="outlined"
            error={errors?.amount}
            helperText={
              errors?.amount &&
              `Amount must be between ${formatMoney(0)} and ${formatMoney(allowed)}.`
            }
          />
          <Controller
            as={
              <DateField
                inputRef={register({ required: true })}
                label="Date Requested"
                disabled={maxedOut || hasActive}
                error={errors?.date}
                helperText={errors?.date && 'Date is required.'}
              />
            }
            defaultValue={new Date()}
            name="date"
            valueName="value"
            control={control}
          />
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              disabled={maxedOut || hasActive}
            >
              Submit
            </Button>
          </DialogActions>
        </Stack>
        {lid?.id && draws && (
          <Box marginLeft={1}>
            <Box px={2} marginBottom={2}>
              <Typography variant="subtitle2">Previous Draw Requests</Typography>
            </Box>
            <DrawHistory loanId={lid?.id} drawRequests={draws} maxHeight={330} />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <StatX
                value={formatMoney(total)}
                label="Total"
              />
            </Box>
          </Box>
        )}
      </Flex>
    </form>
  )
}
