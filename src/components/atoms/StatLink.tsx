import { Link } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import Flex from '../Flex'

interface Props {
  label: string
  value: string
}

export default ({ label, value }: Props) => (
  <Flex align="center">
    <LinkIcon color="action" />
    <Link href={value} variant="subtitle2">
      {label}
    </Link>
  </Flex>
)
