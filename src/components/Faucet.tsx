"use client"

import { SeiWalletProvider } from '@sei-js/react'
import { useRecoilValue } from 'recoil'

import { selectedChainConfigSelector } from '@sparrowswap/recoil'
import { AccountInfo, ChainInfo, RequestButton } from '@sparrowswap/components'
import {Container, Stack} from '@mui/material'

const Faucet = () => {
  const selectedChainConfigUrls = useRecoilValue(selectedChainConfigSelector)

  return (
    <SeiWalletProvider chainConfiguration={selectedChainConfigUrls}>
      <Container maxWidth='sm'>
        <div className='appHeader'>
          <h1>USDC Faucet</h1>
          <p>Receive 100 testnet USDC</p>
        </div>
        <div className='appContent'>
          <Stack spacing={2}>
            <ChainInfo />
            <RequestButton />
            <AccountInfo />
          </Stack>

        </div>
      </Container>
    </SeiWalletProvider>
  )
}

export default Faucet
