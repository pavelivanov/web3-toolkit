import { JsonRpcProvider, Web3Provider, AlchemyProvider, InfuraProvider } from '@ethersproject/providers'
import { requiredChainId } from 'web3'

import state from './state'


const getProvider = (isWalletProvider?: boolean) => {
  if (isWalletProvider) {
    return state.walletProvider.getSigner()
  }

  const chainId = parseInt(window.ethereum.chainId, 16)

  // first we need to check if user has MetaMask installed to use its provider
  // selected network should be same as required
  if (typeof window !== 'undefined' && window.ethereum && chainId === requiredChainId) {
    return new Web3Provider(window.ethereum)
  }

  // Alchemy provider doesn't support "1337" network
  if (requiredChainId === 1337) {
    return new JsonRpcProvider()
  }

  // Goerli Network - there is no Alchemy for Goerli
  if (requiredChainId === 5) {
    return new InfuraProvider(requiredChainId, process.env.NEXT_PUBLIC_INFURA_KEY)
  }

  // otherwise use Alchemy provider
  return new AlchemyProvider(requiredChainId, process.env.NEXT_PUBLIC_ALCHEMY_URL)
}

export default getProvider
