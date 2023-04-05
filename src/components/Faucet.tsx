"use client"

import { SeiWalletProvider } from '@sei-js/react'
import { useRecoilValue } from 'recoil'

import { selectedChainConfigSelector } from '@sparrowswap/recoil'
import { AccountInfo, ChainInfo, RequestButton } from '@sparrowswap/components'

const Faucet = () => {
  const selectedChainConfigUrls = useRecoilValue(selectedChainConfigSelector)

  return (
    <SeiWalletProvider chainConfiguration={selectedChainConfigUrls}>
      <div className='app'>
        <div className='appHeader'>
          <h2>USDC Faucet</h2>
          <p>Receive 100 testnet USDC</p>
        </div>
        <div className='appContent'>
          <ChainInfo />
          <AccountInfo />
          <RequestButton />
        </div>
      </div>
    </SeiWalletProvider>
  )
}

export default Faucet
