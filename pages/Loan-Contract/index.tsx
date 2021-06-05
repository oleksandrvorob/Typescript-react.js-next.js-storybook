import { useState } from 'react'
import useSWR from 'swr'

import Table from 'components/Table'
import { Filter } from 'components/Table-Toolbar/types'
import Status from 'components/atoms/ServicingStatus'
import Expansion from 'components/LoanContract/Content'
import Link from 'components/LoanContract/Link'

import Layout from 'components/Layout'

import { useDebounce, useQuery } from 'lib/hooks'
import { createQueryString } from 'lib/utils'

function Page() {
  const [query, setQuery] = useQuery({
    page: 0,
    rowsPerPage: 5,
    orderBy: 'fundingDate',
    order: 'desc',
  })
  const [filters, setFilters] = useState<Filter[]>([
    { field: 'active', action: 'is', value: 'true' },
  ])

  const url = createQueryString(
    'loancontract',
    (Object.entries(query) as string[][]).concat(
      filters.map((x) => [`${x.field}__${x.action}`, x.value]),
    ),
  )
  const debouncedUrl = useDebounce(url, 250)

  const { data, error } = useSWR(debouncedUrl)
  const loading = !data && !error

  return (
    <Layout>
      <Table
        title="Loan Contracts"
        columns={data?.columns ?? []}
        rows={data?.rows ?? []}
        rowCount={data?.rowCount ?? 0}
        query={query}
        setQuery={setQuery}
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        customComponents={{ status: Status, id: Link }}
        expansionComponent={Expansion}
      />
    </Layout>
  )
}

// Page.getInitialProps = async () => {
//   const res = await fetch(`${BASE_URL}/api/loanContract`)
//   const [data, count] = await res.json()
//   return { data, count }
// }

export default Page
