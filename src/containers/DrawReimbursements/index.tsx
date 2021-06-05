import { useState } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'

// import format from 'date-fns/format'

import { useDrawReimbursementStore } from 'stores/DrawReimbursementStore'

import Breadcrumbs from 'components/Breadcrumbs'
import LoaderBackdrop from 'components/LoaderBackdrop'
import Stack from 'components/Stack'

import Filters from './Filters'
import Reimbursements from './Reimbursements'
// // import ReimbursementRow from './ReimbursementRow'

import { getFloat, getTimeStamp } from 'lib/utils'

import { useAppContext } from 'lib/appContext'

// function flatten(object: object, separator = '.'): object {
//   const isValidObject = (value): boolean => {
//     if (!value) {
//       return false
//     }
//     const isArray = Array.isArray(value)
//     const isBuffer = Buffer.isBuffer(value)
//     const isΟbject = Object.prototype.toString.call(value) === '[object Object]'
//     const hasKeys = !!Object.keys(value).length
//     return !isArray && !isBuffer && isΟbject && hasKeys
//   }
//   return Object.assign(
//     {},
//     ...(function _flatten(child, path = []) {
//       return [].concat(
//         ...Object.keys(child).map((key) =>
//           isValidObject(child[key])
//             ? _flatten(child[key], path.concat([key]))
//             : { [path.concat([key]).join(separator)]: child[key] },
//         ),
//       )
//     })(object),
//   )
// }

const DrawReimbursementContainer = () => {
  // const [view, setView] = useState<string>('list')
  const [address, setAddress] = useState<string | null>()
  const { drawerStats } = useAppContext()

  const { loanContractData } = useDrawReimbursementStore()
  const {
    loanContracts,
    loanContractsCount,
    loadingLoanContracts,
    postReimbursement,
    query,
    setQuery,
  } = loanContractData

  const reducer = (accumulator, currentValue) => accumulator + getFloat(currentValue)

  const loanContractsWithFunded = loanContracts.filter((x) => {
    const totalFunded = x.drawRequests
      .filter((x) => ['funded', 'reimbursed'].includes(x.status))
      .map((x) => x.approvedAmount)
      .reduce(reducer, 0)

    return totalFunded > 0
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  // const csvData = drawRequests.map((element) => {
  //   const cop = JSON.parse(JSON.stringify(element))
  //   delete cop?.reimbursements
  //   delete cop.loanContract.address
  //   return flatten(cop)
  // })

  // const fileName = `draw_requests_export_${format(new Date(), 'MM/dd/yyyy HH:MM:ss')}`

  return (
    <>
      <LoaderBackdrop open={loadingLoanContracts} />
      <Stack>
        <div>
          <Typography color="textSecondary">Accounting</Typography>
          <Breadcrumbs
            links={[
              { title: 'Dashboard', href: '/' },
              { title: 'Accounting' },
              { title: 'Draw Reimbursements', href: '/accounting/draw-reimbursements' },
            ]}
          />
        </div>
        <Divider />
        <Card>
          <CardHeader
            titleTypographyProps={{ variant: 'subtitle2', color: 'textSecondary' }}
            title={`Draw Request Reimbursements (${drawerStats.drawReimbursementsCount})`}
            action={
              <Box display="flex" justifyContent="center" alignItems="center">
                <Filters />
                <Button
                  variant="outlined"
                  href="/api/csv/reimbursement-request"
                  download={`reimbursement-request-${getTimeStamp(new Date())}.csv`}
                  style={{ marginLeft: '8px' }}
                >
                  Download Report
                </Button>
              </Box>
            }
          />

          <CardContent>
            <Reimbursements
              key={JSON.stringify(loanContractsWithFunded)}
              loanContracts={loanContractsWithFunded}
              submitReimbursement={postReimbursement}
            />
          </CardContent>

          <CardActions>
            <Box marginLeft="auto" marginRight="32px">
              <Pagination
                // TODO: make dynamic
                count={Math.floor(loanContractsCount / query.rowsPerPage)}
                page={query.page}
                variant="outlined"
                size="large"
                onChange={(_, page) => setQuery({ page })}
              />
            </Box>
          </CardActions>
        </Card>
      </Stack>
    </>
  )
}

export default DrawReimbursementContainer
