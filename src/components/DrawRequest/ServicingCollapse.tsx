import { FunctionComponent } from 'react'
import Collapse from 'components/Collapse'
import CenteredStack from 'components/CenteredStack'

import StatRow from 'components/atoms/StatRow'
import StatY from 'components/atoms/StatY'
import Link from 'components/atoms/Link'

import { Fci } from 'lib/interfaces'

interface Props {
  fci: Fci
}

const ServicingCollapse: FunctionComponent<Props> = ({ fci }) => {
  return (
    <Collapse
      title="Servicing"
      linkComponent={<Link title={String(fci?.loanId) ?? ''} href={`/fci/${fci.loanId}`} />}
      contentComponent={
        <CenteredStack>
          <StatRow>
            <StatY label="status" value={fci.status} />
            <StatY label="assignment" value={fci.assignment} />
            <StatY label="last updated" value={fci.updatedAt} />
          </StatRow>
        </CenteredStack>
      }
    />
  )
}

export default ServicingCollapse
