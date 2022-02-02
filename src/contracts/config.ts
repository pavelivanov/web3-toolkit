import type { ERC20 } from './types'

import erc20Abi from './abis/ERC20.json'


export type ContractsAbi = {
  usdc: ERC20
  usdt: ERC20
}

export type ContractName = keyof ContractsAbi

export type ContractData<Symbol extends string> = {
  address: string
  abi: object[]
  symbol?: Symbol
  decimals?: number
}

export type ContractsData = {
  [Name in ContractName]: ContractData<string>
}

export type Contracts = {
  [Name in ContractName]: ContractsAbi[Name]
}

export const contracts: ContractsData = {
  usdt: {
    address: process.env.NEXT_PUBLIC_USDT,
    abi: erc20Abi,
    symbol: 'CPOOL',
    decimals: 18,
  },
  usdc: {
    address: process.env.NEXT_PUBLIC_USDC,
    abi: erc20Abi,
    symbol: 'USDC',
    decimals: 18,
  },
}
