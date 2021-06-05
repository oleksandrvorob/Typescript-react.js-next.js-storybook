import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      // main: '#69f0ae',
      // main: '#42a5f5',
      main: '#455a64',
    },
    // secondary: {
    //   main: '#47dd92',
    // },
    // error: {
    //   main: red.A400,
    // },
  },
})

theme.shadows[1] = '0px 11px 15px 1px rgba(0, 0, 0, 0.02), 0px 4px 20px 3px rgba(0, 0, 0, 0.04)'
theme.shadows[2] =
  '00px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'

export default theme
