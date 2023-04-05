"use client"

import { SeiWalletProvider } from '@sei-js/react'
import { useRecoilValue } from 'recoil'

import { selectedChainConfigSelector } from '@sparrowswap/recoil'
import { ChainInfo, AccountInfo } from '@sparrowswap/components'

const Faucet = () => {
  const selectedChainConfigUrls = useRecoilValue(selectedChainConfigSelector)

  return (
    <SeiWalletProvider chainConfiguration={selectedChainConfigUrls}>
      <div className='app'>
        <div className='appHeader'>
          <h2>Faucet</h2>
        </div>
        <div className='appContent'>
          <ChainInfo />
          <AccountInfo />
        </div>
      </div>
    </SeiWalletProvider>
  )
}

export default Faucet
