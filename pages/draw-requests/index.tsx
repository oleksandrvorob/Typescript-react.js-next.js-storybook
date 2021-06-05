import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import styled from 'styled-components'
import { useSession } from 'next-auth/client'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

import AccessDenied from 'components/AccessDenied'
import Note from 'components/Note'
import Breadcrumbs from 'components/Breadcrumbs'
import Link from 'components/atoms/Link'
import TimeStamp from 'components/atoms/Date'
import Stack from 'components/Stack'
import Table from 'components/Table'
import { Filter } from 'components/Table-Toolbar/types'

import Toolbar from 'components/DrawRequest/Toolbar'
import Layout from 'components/Layout'

import { useDebounce, useQuery } from 'lib/hooks'
import { createQueryString } from 'lib/utils'
import Foo from 'components/Charts/DrawRequest.Status.Count'
import Bar from 'components/Charts/DrawRequest.DaysToInspection.Avg'

import { makeStyles, Theme } from '@material-ui/core/styles'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  grid-gap: 8px;
`

const DrawLink = (row) => (
  <Link
    title={`RD-${row.drawNumber}`}
    href={`/loan-contract/${row?.loanId}/draw-requests/${row?.drawNumber}`}
    underline="always"
    variant="subtitle2"
  />
)
const LoanLink = (row) => (
  <Link
    title={row.lid}
    href={`/loan-contract/${row?.loanId}`}
    style={{ whiteSpace: 'nowrap' }}
    underline="always"
    variant="subtitle2"
  />
)

const SECTIONS = ['loans', 'draws', 'reimbursements']

const useStyles = makeStyles((theme: Theme) => ({
  chartGreen: {
    background: theme.palette.success.light,
  },
  chartBlue: {
    background: theme.palette.primary.light,
  },
}))

const DrawRequestPage = () => {
  const classes = useStyles()
  const [session, loadingSession] = useSession()

  const [query, setQuery] = useQuery({
    page: 0,
    rowsPerPage: 5,
    orderBy: 'requestedDate',
    order: 'desc',
  })

  const [filters, setFilters] = useState<Filter[]>([])

  const url = createQueryString(
    'draw-requests',
    (Object.entries(query) as string[][]).concat(
      filters.map((x) => [`${x.field}__${x.action}`, x.value]),
    ),
  )

  const debouncedUrl = useDebounce(url, 250)

  const [{ rows, rowCount, columns }, setRows] = useState({ rows: [], rowCount: 0, columns: [] })
  const { data, error } = useSWR(debouncedUrl, { revalidateOnFocus: true })
  const loading = !data && !error

  // show data while loading, gives appearance of being faster
  useEffect(() => {
    if (data && !loading) {
      const { rows, rowCount, columns } = data

      setRows({ rows, rowCount, columns })
    }
  }, [data, loading])

  const displayColumns = columns
    ? columns.filter(
      ({ id }) => !['manualDrawId', 'approvedAmountToDate', 'id', 'lid', 'archived'].includes(id),
    )
    : []

  if (loadingSession) {
    return null
  }

  if (!session && !loadingSession) {
    return <AccessDenied />
  }

  return (
    <Layout>
      <Stack space="32px">
        <Stack>
          <div>
            <Typography color="textSecondary">{`Draw Requests`}</Typography>
            <Breadcrumbs
              links={[
                { title: 'Dashboard', href: '/' },
                { title: 'Draw Requests', href: '/draw-requests' },
              ]}
            />
          </div>
          <Grid>
            <Card className={classes.chartGreen}>
              <Foo
                rows={[
                  {
                    x: 'approved',
                    y: 435498.77,
                  },
                  {
                    x: 'pending',
                    y: 2858979.9,
                  },
                ]}
              />
            </Card>
            <Card className={classes.chartBlue}>
              <Bar />
            </Card>
          </Grid>
        </Stack>
        <Stack space="8px">
          <Toolbar
            filters={filters}
            setFilters={setFilters}
            searchTerm={query.searchTerm}
            setSearchTerm={(x) => setQuery({ searchTerm: x, page: 0 })}
            columns={displayColumns}
            onSuccess={() => mutate(url)}
          />

          <Table
            title="Draw Requests"
            columns={displayColumns}
            rows={rows}
            rowCount={rowCount}
            query={query}
            setQuery={setQuery}
            loading={loading}
            filters={filters}
            setFilters={setFilters}
            customComponents={{
              drawNumber: DrawLink,
              loanId: LoanLink,
              notes: Note,
              disbursedDate: ({ disbursedDate }) => <TimeStamp value={disbursedDate} />,
              approvedDate: ({ approvedDate }) => <TimeStamp value={approvedDate} />,
              requestedDate: ({ requestedDate }) => <TimeStamp value={requestedDate} />,
            }}
            includeToolBar={false}
          />
        </Stack>
      </Stack>
    </Layout>
  )
}

export default DrawRequestPage
