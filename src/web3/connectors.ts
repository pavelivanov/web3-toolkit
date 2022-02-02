import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect'
}

const injected = new InjectedConnector({
  supportedChainIds: [ 1, 3, 4, 5, 42, 56, 97, 1337 ],
})

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
    4: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  },
  qrcode: true,
})


export default {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}
