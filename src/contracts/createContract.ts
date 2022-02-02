import { Contract } from '@ethersproject/contracts'

import type { ContractsAbi, ContractName } from './config'
import { contracts } from './config'


const createContract = <Name extends ContractName>(name: Name, provider: any): ContractsAbi[Name] => {
  const { address, abi } = contracts[name]

  return new Contract(address, abi, provider) as unknown as ContractsAbi[Name]
}

export default createContract
