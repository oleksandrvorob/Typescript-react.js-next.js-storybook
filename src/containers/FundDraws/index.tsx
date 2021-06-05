import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

// import format from 'date-fns/format'

import { useAccountingStore } from 'stores/AccountingStore'

import Breadcrumbs from 'components/Breadcrumbs'
import Dialog from 'components/atoms/Dialog'
import Grid from 'components/DrawRequestGrid'
// import ExportExcel from 'components/ExportExcel'
import LoaderBackdrop from 'components/LoaderBackdrop'
import Stack from 'components/Stack'

import FundingRow from './FundingRow'
import ToggleButtons from './ToggleButtons'
import ExportDraws from './ExportDraws'

function flatten(object: object, separator = '.'): object {
  const isValidObject = (value): boolean => {
    if (!value) {
      return false
    }
    const isArray = Array.isArray(value)
    const isBuffer = Buffer.isBuffer(value)
    const isΟbject = Object.prototype.toString.call(value) === '[object Object]'
    const hasKeys = !!Object.keys(value).length
    return !isArray && !isBuffer && isΟbject && hasKeys
  }
  return Object.assign(
    {},
    ...(function _flatten(child, path = []) {
      return [].concat(
        ...Object.keys(child).map((key) =>
          isValidObject(child[key])
            ? _flatten(child[key], path.concat([key]))
            : { [path.concat([key]).join(separator)]: child[key] },
        ),
      )
    })(object),
  )
}

const FundDraws = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [view, setView] = useState<string>('list')
  const { drawRequestData, approvedDrawRequests } = useAccountingStore()
  const { drawRequests, patchDrawRequest, loadingDrawRequests } = drawRequestData

  const methods = useForm()

  const handleSubmitFunded = (data: Record<string, string>) => {
    const items = Object.entries(data).filter(([_key, val]) => !!val)
    items.forEach(([drawRequestId, disbursedDate]) => {
      // @ts-ignore
      patchDrawRequest(drawRequestId, { disbursedDate })
    })
  }

  const csvData = drawRequests.map((element) => {
    const cop = JSON.parse(JSON.stringify(element))
    delete cop.reimbursements
    delete cop.loanContract.address
    return flatten(cop)
  })

  // const fileName = `draw_requests_export_${format(new Date(), 'MM/dd/yyyy HH:MM:ss')}`

  return (
    <>
      <LoaderBackdrop open={loadingDrawRequests} />
      <Stack>
        <div>
          <Typography color="textSecondary">Accounting</Typography>
          <Breadcrumbs
            links={[
              { title: 'Dashboard', href: '/' },
              { title: 'Accounting' },
              { title: 'Fund Draws', href: '/accounting/fund-draws' },
            ]}
          />
        </div>
        <Divider />
        <Card>
          <CardHeader
            titleTypographyProps={{ variant: 'subtitle2', color: 'textSecondary' }}
            title={`Draws Ready to Fund (${approvedDrawRequests.length})`}
            action={
              <Box display="flex" alignItems="center">
                <ToggleButtons value={view} onChange={setView} />
                <Button onClick={() => setOpen(true)}>Export Funded</Button>
                {/* <ExportExcel title="Export XLSX" csvData={csvData} fileName={fileName} /> */}
              </Box>
            }
          />
          <CardContent>
            {view === 'list' ? (
              <>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(handleSubmitFunded)}>
                    <Box>
                      <Table size="small">
                        <TableBody>
                          {approvedDrawRequests.map((item) => (
                            <FundingRow drawRequest={item} key={item.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </form>
                </FormProvider>
              </>
            ) : (
              <Grid drawRequests={approvedDrawRequests} />
            )}
          </CardContent>
        </Card>
      </Stack>
      <Dialog open={open} handleClose={() => setOpen(false)} title="Export Funded Draws">
        <ExportDraws />
      </Dialog>
    </>
  )
}

export default FundDraws
