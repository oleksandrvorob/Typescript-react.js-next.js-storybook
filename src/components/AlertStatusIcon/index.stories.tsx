import AlertStatusIcon from '.'

import Stack from 'components/Stack'

export default { title: 'Alert Status Icon' }

export const Examples = () => (
  <Stack>
    <AlertStatusIcon severity="success" />
    <AlertStatusIcon severity="info" />
    <AlertStatusIcon severity="warning" />
    <AlertStatusIcon severity="error" />
  </Stack>
)
