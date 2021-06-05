import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'

import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import AccessDenied from 'components/AccessDenied'
import Stack from 'components/Stack'
import Breadcrumbs from 'components/Breadcrumbs'
import DrawRequestContainer from 'containers/DrawRequestContainer'
import Link from 'components/atoms/Link'

import Layout from 'components/Layout'

import DrawRequestStore from 'stores/DrawRequestStore'
import { getSQ } from 'lib/services/base'

const DrawRequest = ({ loanId, drawNumber, lid }) => {
  const [session, loadingSession] = useSession()

  if (loadingSession) {
    return null
  }

  if (!session && !loadingSession) {
    return <AccessDenied />
  }

  return (
    <Layout>
      <Stack>
        <div>
          <Typography color="textSecondary">
            {`Draw Request No. ${drawNumber} for Loan`}{' '}
            <Link title={lid} href={`/loan-contract/${lid}`} variant="subtitle2" />
          </Typography>
          <Breadcrumbs
            links={[
              { title: 'Dashboard', href: '/' },
              { title: 'Draw Requests', href: '/draw-requests' },
              { title: `Loan Contract ${loanId}`, href: `/loan-contract/${loanId}` },
              {
                title: `Draw Request ${drawNumber}`,
                href: `/loan-contract/${loanId}/draw-requests/${drawNumber}`,
              },
            ]}
          />
        </div>
        <Divider />
      </Stack>
      <DrawRequestStore loanId={loanId} drawNumber={drawNumber}>
        <DrawRequestContainer loanId={loanId} />
      </DrawRequestStore>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  const { id, drawNumber } = query

  const sq = getSQ()

  const doesExist = await sq.from`draw_request`.leftJoin`loan_contract`
    .on`draw_request.loan_id = loan_contract.id`
    .where({ loanId: id, drawNumber })
    .one()

  await sq.end()

  if (!doesExist) {
    res.writeHead(302, { Location: '/404' })
    res.end()
    return
  }

  return { props: { loanId: id, drawNumber, lid: doesExist?.lid } }
}

export default DrawRequest
