import type { Contracts, ContractName } from './config'
import createContract from './createContract'
import getProvider from './getProvider'
import state from './state'


const getContract = <Name extends ContractName>(name: Name, withWalletProvider?: boolean): Contracts[Name] => {
  const store = (withWalletProvider ? state.contractsWithProvider : state.contracts) as Contracts
  const isStored = Boolean(store[name])

  if (!isStored) {
    const provider = getProvider(withWalletProvider)
    store[name] = createContract(name, provider) as any
  }

  if (withWalletProvider) {
    return state.contractsWithProvider[name]
  }

  return state.contracts[name]
}


export default getContract
