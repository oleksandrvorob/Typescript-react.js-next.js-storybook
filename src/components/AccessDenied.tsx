import { signIn } from 'next-auth/client'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default function AccessDenied() {
  return (
    <>
      <Typography variant="h4">Access Denied</Typography>
      <p>
        <Link
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            // @ts-ignore
            signIn()
          }}
          color="primary"
          underline="always"
        >
          You must be signed in to view this page
        </Link>
      </p>
    </>
  )
}
