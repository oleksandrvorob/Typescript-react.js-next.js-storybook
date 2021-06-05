import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

interface Props {
  label?: string
  value?: string
}

const StatX = (props: Props) => (
  <Box display="flex" alignItems="center">
    {!!props?.label && (
      <Typography variant="body2" color="textSecondary">
        {props?.label ?? '-'}:&nbsp;
      </Typography>
    )}
    <Typography variant="body1" color="textPrimary" style={{ marginLeft: '8px' }}>
      {props?.value ?? '-'}
    </Typography>
  </Box>
)

export default StatX
