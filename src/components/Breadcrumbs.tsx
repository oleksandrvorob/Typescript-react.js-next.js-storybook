import { Breadcrumbs } from '@material-ui/core'

import Link from './atoms/Link'

interface Crumb {
  title: string
  href?: string
}

interface Props {
  links: Crumb[]
}

export default ({ links }: Props) => (
  <Breadcrumbs aria-label="breadcrumb">
    {links.map(({ title, href }, idx) => (
      <Link key={idx} title={title} href={!!href ? href : null} variant="caption" />
    ))}
  </Breadcrumbs>
)
