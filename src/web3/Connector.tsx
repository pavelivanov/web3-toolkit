import React, { useEffect } from 'react'
import { ConnectorNames } from 'web3'

import useConnect from './useConnect'
import constants from './constants'


const Connector: React.FunctionComponent = ({ children }) => {
  const { connect } = useConnect()

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  useEffect(() => {
    const connectorName = localStorage.getItem(constants.connectorName) as ConnectorNames

    if (connectorName) {
      if (connectorName === ConnectorNames.WalletConnect) {
        const isConnected = Boolean(localStorage.getItem(constants.walletconnectKey) as ConnectorNames)

        if (!isConnected) {
          // saved but not actually connected, cleanup
          localStorage.removeItem(constants.connectorName)
          return
        }
      }

      connect(connectorName)
    }
  }, [])

  return (
    <>{children}</>
  )
}


export default Connector
