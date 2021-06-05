import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'styled-components'
import { Provider as AuthProvider } from 'next-auth/client'
import { ConfirmProvider } from 'material-ui-confirm'

import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from 'lib/theme'
import AppContextProvider from 'lib/appContext'
import fetcher from 'lib/fetchJson'
import Layout from 'components/Layout'

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Quanta Platform</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <SWRConfig
              value={{
                fetcher,
                onError: (err) => {
                  console.error(err)
                },
              }}
            >
              <AuthProvider
                // Provider options are not required but can be useful in situations where
                // you have a short session maxAge time. Shown here with default values.
                options={{
                  // Client Max Age controls how often the useSession in the client should
                  // contact the server to sync the session state. Value in seconds.
                  // e.g.
                  // * 0  - Disabled (always use cache value)
                  // * 60 - Sync session state with server if it's older than 60 seconds
                  clientMaxAge: 0,
                  // Keep Alive tells windows / tabs that are signed in to keep sending
                  // a keep alive request (which extends the current session expiry) to
                  // prevent sessions in open windows from expiring. Value in seconds.
                  //
                  // Note: If a session has expired when keep alive is triggered, all open
                  // windows / tabs will be updated to reflect the user is signed out.
                  // keepAlive: 0,
                }}
                session={pageProps.session}
              >
                <AppContextProvider>
                  {/* <Layout> */}
                  <ConfirmProvider>
                    <Component {...pageProps} />
                  </ConfirmProvider>
                  {/* </Layout> */}
                </AppContextProvider>
              </AuthProvider>
            </SWRConfig>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </React.Fragment>
  )
}
