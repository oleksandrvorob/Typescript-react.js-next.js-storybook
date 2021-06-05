import React from 'react'
import { addDecorator } from '@storybook/react'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import muiTheme from '../src/lib/theme'

addDecorator((storyFn) => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={muiTheme}>{storyFn()}</ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
))
