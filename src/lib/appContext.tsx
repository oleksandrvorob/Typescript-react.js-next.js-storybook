import React, { createContext, useContext, useState } from 'react'
import { isEmpty } from 'lodash'

import useDrawerStats, { DrawerStats } from 'hooks/useDrawerStats'

type MessageLevel = 'success' | 'info' | 'warning' | 'error'

interface AppState {
  showMessage: boolean
  message: string
  messageLevel: MessageLevel
  setMessage: (message: string, messageLevel?: string) => void
  drawerStats: DrawerStats
}

export const AppContext = createContext<AppState>({} as AppState)

function AppContextProvider({ children }) {
  const drawerStats = useDrawerStats()

  const [state, setState] = useState({
    showMessage: false,
    message: '',
    messageLevel: 'success' as MessageLevel,
    setMessage,
  })

  function setMessage(message: string, messageLevel = 'success' as MessageLevel) {
    setState((prevState) => {
      return {
        ...prevState,
        message,
        showMessage: !isEmpty(message),
        messageLevel,
      }
    })
  }

  return <AppContext.Provider value={{ ...state, drawerStats }}>{children}</AppContext.Provider>
}

function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAccountingStore must be used within a AppContext Provider')
  }
  return context
}

export { useAppContext }

export default AppContextProvider
