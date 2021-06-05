import { Link } from '@material-ui/core'
import { LinkProps } from '@material-ui/core/Link'

interface Props extends LinkProps {
  title: string
  href?: string | null
}

export default ({ title, href, ...linkProps }: Props) => (
  <Link href={href} onClick={(e) => e.stopPropagation()} {...linkProps}>
    {title}
  </Link>
)
