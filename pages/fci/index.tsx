import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'

import AccessDenied from 'components/AccessDenied'
import Table from 'components/Table'
import { Filter } from 'components/Table-Toolbar/types'
import Status from 'components/atoms/ServicingStatus'
import Expansion from 'components/Fci/Expansion'
import Link from 'components/Fci/Link'

import Layout from 'components/Layout'

import { useDebounce, useQuery } from 'lib/hooks'
import { createQueryString } from 'lib/utils'

function Page() {
  const [session, loadingSession] = useSession()

  const [query, setQuery] = useQuery({ page: 0, rowsPerPage: 5, orderBy: 'loan_id', order: 'asc' })
  const [filters, setFilters] = useState<Filter[]>([])

  const url = createQueryString(
    'fci',
    (Object.entries(query) as string[][]).concat(
      filters.map((x) => [`${x.field}__${x.action}`, x.value]),
    ),
  )
  const debouncedUrl = useDebounce(url, 250)

  const [{ rows, rowCount, columns }, setRows] = useState({ rows: [], rowCount: 0, columns: [] })
  const { data, error } = useSWR(!!session && debouncedUrl)
  const loading = !data && !error

  // show data while loading, gives appearance of being faster
  useEffect(() => {
    if (data && !loading) {
      const { rows, rowCount, columns } = data

      setRows({ rows, rowCount, columns })
    }
  }, [data, loading])

  if (loadingSession) {
    return null
  }

  if (!session && !loadingSession) {
    return <AccessDenied />
  }

  return (
    <Layout>
      <Table
        title="FCI"
        columns={columns || []}
        rows={rows.map((x, idx) => ({ ...x, id: idx }))}
        rowCount={rowCount}
        query={query}
        setQuery={setQuery}
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        customComponents={{ status: Status, loanId: Link }}
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
