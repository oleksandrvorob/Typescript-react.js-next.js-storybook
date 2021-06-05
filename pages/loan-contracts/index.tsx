import useLoanContract from 'hooks/useLoanContracts'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone'

import Breadcrumbs from 'components/Breadcrumbs'
import LoaderBackdrop from 'components/LoaderBackdrop'
import Stack from 'components/Stack'

import Layout from 'components/Layout'

import TableHead from 'components/Table-Head'

import { formatMoney, getFloat } from 'lib/utils'

export default () => {
  const {
    loanContracts,
    loanContractsCount,
    loadingLoanContracts,
    query,
    setQuery,
  } = useLoanContract({})

  const handleChangePage = (_event: unknown, newPage: number) => {
    setQuery({ page: newPage })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ rowsPerPage: parseInt(event.target.value, 10), page: 0 })
  }

  const sumDraws = (drawRequests) => {
    return drawRequests
      .filter((x) => x.status === 'funded')
      .map((x) => getFloat(x.approvedAmount))
      .reduce((prev, curr) => prev + curr, 0)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, orderBy: string) => {
    setQuery({
      orderBy,
      order: query.order === 'asc' ? 'desc' : 'asc',
      page: 0,
      // page: orderBy === query.orderBy ? query.page : 0,
    })
  }

  return (
    <Layout>
      <LoaderBackdrop open={loadingLoanContracts} />
      <Stack>
        <div>
          <Typography color="textSecondary">Loan Contracts</Typography>
          <Breadcrumbs
            links={[
              { title: 'Dashboard', href: '/' },
              { title: 'Loan Contracts', href: '/loan-contracts' },
            ]}
          />
        </div>
        <Divider />
        <Box maxWidth="350px" marginLeft="auto">
          <TextField
            label="Address"
            variant="outlined"
            value={query.searchTerm}
            onChange={(e) => setQuery({ searchTerm: e.target.value })}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setQuery({ searchTerm: '' })}>
                  <CancelTwoToneIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Card>
          <TableContainer>
            <Table>
              <TableHead
                columns={[
                  { id: 'lid', label: 'LID' },
                  { id: 'fullAddress', label: 'Address' },
                  { id: 'borrowerName', label: 'Borrower' },
                  { id: 'transactionState', label: 'Transaction State' },
                  { id: 'fundingDate', label: 'Funding Date' },
                  { id: 'amount', label: 'Funding Amount at Close' },
                  { id: 'lienPosition', label: 'Lien Position' },
                  { id: 'status', label: 'Servicing Status' },
                  { id: null, label: 'Drawn Total $' },
                  { id: null, label: 'Principal Balance' },
                ]}
                onRequestSort={handleRequestSort}
                orderBy={query.orderBy}
                order={query.order}
              />

              {loanContracts.map((x) => {
                const drawnTotal = sumDraws(x?.drawRequests ?? [])
                const principal = drawnTotal + getFloat(x.amount)

                return (
                  <TableRow>
                    <TableCell>{x.lid}</TableCell>
                    <TableCell>{x.fullAddress}</TableCell>
                    <TableCell style={{ maxWidth: '200px' }}>
                      <Typography variant="body2" noWrap>
                        {x.borrowerName}
                      </Typography>
                    </TableCell>
                    <TableCell>{x.transactionState}</TableCell>
                    <TableCell>{x.fundingDate}</TableCell>
                    <TableCell>{x.amount}</TableCell>
                    <TableCell>{x.lienPosition}</TableCell>
                    <TableCell>{x.status}</TableCell>
                    <TableCell>{formatMoney(drawnTotal)}</TableCell>
                    <TableCell>{formatMoney(principal)}</TableCell>
                  </TableRow>
                )
              })}
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={loanContractsCount}
              rowsPerPage={query.rowsPerPage}
              page={query.page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            // nextIconButtonProps={loading ? { disabled: loading } : {}}
            // backIconButtonProps={loading ? { disabled: loading } : {}}
            />
          </TableContainer>
        </Card>
      </Stack>
    </Layout>
  )
}
