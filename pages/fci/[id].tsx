import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Card, CardContent, CardHeader, Typography, Box, Divider } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { post } from 'lib/fetch'
import { getTwitterDate } from 'lib/utils'

import LabeledBox from 'components/LabeledBox'
import Stack from 'components/Stack'
import { Get } from 'lib/services/fci'
import QuickView from 'components/LoanContract/QuickView'
import Preview from 'components/LoanContract/Preview'

import StatRow from 'components/atoms/StatRow'
import StatY from 'components/atoms/StatY'
import StatX from 'components/atoms/StatX'
import Flex from 'components/Flex'

import Layout from 'components/Layout'

export default ({ fci, potentialMatches }) => {
  const router = useRouter()
  const { id: fciLoanId } = router.query

  const { data, mutate } = useSWR(`/api/fci/${fciLoanId}`)

  fci = data?.fci ?? fci
  potentialMatches = data?.potentialMatches ?? []

  const handleClick = async (loanContractId: number) => {
    const res = await post(`/api/loancontract/${loanContractId}`, JSON.stringify({ fciLoanId }), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    mutate({ nestedLoanContract: res })
  }

  const matches = potentialMatches?.matches ?? []
  return (
    <Layout>
      <Card variant="outlined">
        <CardHeader title={`FCI Account No. ${fciLoanId}`} subheader={fci?.fullAddress} />
        <CardContent>
          <Stack>
            <StatRow>
              <Typography color="textSecondary">{fci?.borrowerName}</Typography>
              <StatX label="updated" value={getTwitterDate(fci?.updatedAt)} />
            </StatRow>
            <Stack>
              <LabeledBox label="status">
                <StatRow>
                  <StatY label="status" value={fci?.status} />
                  <StatY label="amount" value={fci?.originalBalance} />
                  <StatY label="lien position" value={fci?.lienPosition} />
                </StatRow>
              </LabeledBox>
              <LabeledBox label="loan timeline">
                <StatRow>
                  <StatY label="funded" value={fci?.fundingDate} />
                  <StatY label="next due date" value={fci?.nextDueDate} />
                  <StatY label="paid to date" value={fci?.paidToDate} />
                  <StatY label="maturity date" value={fci?.maturityDate} />
                  <StatY label="maturity date" value={fci?.paidOffDate} />
                </StatRow>
              </LabeledBox>
            </Stack>
            <Typography color="textSecondary">Loan Contract</Typography>
            <Box p="16px">
              {fci?.nestedLoanContract ? (
                <Preview {...(fci?.nestedLoanContract ?? {})} />
              ) : (
                  <LabeledBox label="Potential Matches">
                    <Stack>
                      {matches.map((item, idx) => (
                        <>
                          <Flex align="center" key={idx}>
                            <Fab
                              disabled={!!item?.fciLoanId}
                              color="primary"
                              size="medium"
                              onClick={() => handleClick(item?.id)}
                            >
                              <AddIcon />
                            </Fab>
                            <div style={{ marginLeft: '24px' }}>
                              <QuickView loanContract={item} />
                            </div>
                          </Flex>
                          {idx < matches.length - 1 && <Divider variant="inset" />}
                        </>
                      ))}
                    </Stack>
                  </LabeledBox>
                )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  const [fci, potentialMatches] = await Get(Number(id))
  return { props: JSON.parse(JSON.stringify({ fci, potentialMatches, id })) }
}
