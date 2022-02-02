import { useEffect } from 'react'
import { useConnect } from 'web3'

import state, { resetState } from './state'


const ContractsProvider = ({ children }) => {
  const { library } = useConnect()

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', resetState)
    }

    return () => {
      window.ethereum.removeListener('chainChanged', resetState)
    }
  }, [])

  if (!state.walletProvider) {
    state.walletProvider = library
  }

  return children
}


export default ContractsProvider
