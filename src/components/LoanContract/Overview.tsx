import { Alert, AlertTitle } from '@material-ui/lab'

const statusEnum = {
  'Paid Off': 'success',
  REO: 'info',
  Performing: 'info',
  Assigned: 'info',
  Delinquent: 'error',
  Foreclosure: 'error',
}

export default ({ loanContract, knack }) => {
  return (
    <Alert severity={statusEnum?.[loanContract?.status] ?? 'info'} variant="outlined">
      <AlertTitle>{loanContract?.status}</AlertTitle>
      FCI shows {loanContract?.status} — Knack <strong>Transaction_State_Master</strong> shows{' '}
      <strong>{knack?.Transaction_State_Master ?? 'nothing'}</strong>
    </Alert>
  )
}
