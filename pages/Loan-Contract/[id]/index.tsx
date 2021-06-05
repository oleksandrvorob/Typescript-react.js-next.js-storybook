import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import _get from 'lodash/get'
import _isObject from 'lodash/isObject'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Get } from 'lib/services/loanContract'
import Flex from 'components/Flex'
import Stat from 'components/Stat'
import Layout from 'components/Layout'

const SECTIONS = ['overview', 'fci', 'knack', 'property']

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 8px;
  max-width: 100%;
`

const Switch = ({ value, children }) => <>{children[value]}</>

export default ({ knack, id, sectionId }) => {
  const router = useRouter()
  const [value, setValue] = useState(sectionId)

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    router.replace('/Loan-Contract/[id]', `/Loan-Contract/${id}?section=${SECTIONS[newValue]}`, {
      shallow: true,
    })
    setValue(newValue)
  }

  return (
    <Layout>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Overview" />
          <Tab label="FCI" />
          <Tab label="Knack" />
          <Tab label="Property" />
        </Tabs>
        <Switch value={value}>
          {/* <Overview loanContract={loanContract} knack={knack} /> */}
          <div>FCI</div>
          <div>
            <Flex>
              {!!knack ? (
                <Stats>
                  {Object.entries(knack).map(([field, text]) => (
                    <Stat label={field} value={_isObject(text) ? JSON.stringify(text) : text} />
                  ))}
                </Stats>
              ) : (
                  <div>no data found</div>
                )}
              <div style={{ flexGrow: 1 }} />
            </Flex>
          </div>
          <div>4</div>
        </Switch>
      </Paper>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, section } = query

  const sectionId = (section && SECTIONS.findIndex((x) => x === section)) || 0

  const res = await Get(Number(id))
  const knack = res[1]

  return { props: { knack, id, sectionId } }
}
