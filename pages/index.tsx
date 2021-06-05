import styled from 'styled-components'
import { Box, Card, CardHeader, CardContent } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'

import AccessDenied from 'components/AccessDenied'
import VolumeYear from 'components/Charts/Volume.Year'
import CountStatus from 'components/Charts/Count.Status'
import VolumeStatusState from 'components/Charts/Volume.Status.State'
import VolumeMonth from 'components/Charts/Volume.Month'

import Layout from 'components/Layout'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`

export default () => {
  const [session, loading] = useSession()
  const { data } = useSWR(session?.user && '/api/charts')

  const [volYear, countStatus, volStatusState, volMonth, volAvg, stateTimeline] =
    data || Array(6).fill([])

  if (loading) {
    return null
  }

  if (!session && !loading) {
    return <AccessDenied />
  }

  return (
    <Layout>
      <Card elevation={0} style={{ background: 'transparent' }}>
        <CardHeader title="Dashboard" />
        <CardContent>
          <Card variant="outlined" style={{ background: 'transparent' }}>
            <CardHeader subheader="Monthly Snapshots" style={{ marginBottom: 0, paddingBottom: 0 }} />
            <VolumeMonth rowsMonth={volMonth} rowsAvg={volAvg} rowsStates={stateTimeline} />
          </Card>

          <Grid>
            <Card elevation={0} style={{ background: 'transparent' }}>
              {data ? <CountStatus rows={countStatus} /> : <div>loading...</div>}
            </Card>
            <Card elevation={0} style={{ background: 'transparent' }}>
              {volYear ? (
                <VolumeYear rows={volYear} />
              ) : (
                  <Box pt={0.5}>
                    <Skeleton
                      height={250}
                      width={250}
                      variant="circle"
                      animation="wave"
                      style={{ padding: '48px' }}
                    />
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                )}
            </Card>
            <VolumeStatusState rows={volStatusState} />
          </Grid>
        </CardContent>
      </Card>
    </Layout>
  )
}
