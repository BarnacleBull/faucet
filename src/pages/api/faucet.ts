// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  AccountData,
  Coin,
  coin,
  DirectSecp256k1HdWallet,
  EncodeObject
} from '@cosmjs/proto-signing'
import { getSigningCosmWasmClient } from '@sei-js/core'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { calculateFee, GasPrice, isDeliverTxFailure } from '@cosmjs/stargate'

type Data = {
  status: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  try {
    const { account, client, gasPrice } = await newWallet()
    const toSend = faucetCoin()
    if (typeof req.query.dest !== 'string') {
      throw new Error('Invalid query')
    }
    const { dest } = req.query

    const response = await client.sendTokens(account.address, dest, [toSend], calculateFee(200000, gasPrice))
    res.status(200).json({status: "success"})
  } catch (e: any) {
    console.error(e)
    res.status(500).json({status: "error"})
  }

}

export interface Wallet {
  account: AccountData
  chainId: string
  client: SigningCosmWasmClient
  gasPrice: GasPrice
}

function faucetCoin(): Coin {
  if (!process.env.DENOM) {
    throw new Error('Set the DENOM env variable to the token to use')
  }

  if (!process.env.AMOUNT) {
    throw new Error('Set the AMOUNT env variable to the amount to use')
  }

  return coin(process.env.AMOUNT, process.env.DENOM)
}
async function newWallet(): Promise<Wallet> {
  if (!process.env.MNEMONIC) {
    throw new Error('Set the MNEMONIC env variable to the mnemonic of the wallet to use')
  }

  if (!process.env.GAS_PRICE) {
    throw new Error('Set the GAS_PRICE env variable to the gas price to use when creating client')
  }

  if (!process.env.RPC_URL) {
    throw new Error('Set the RPC_URL env variable to the RPC URL of the node to use')
  }

  const signer = await DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, {
    prefix: 'sei'
  })

  const accounts = await signer.getAccounts()
  if (accounts.length === 0) {
    throw new Error('No accounts found in wallet')
  }

  if (accounts.length > 1) {
    throw new Error('Multiple accounts found in wallet. Not sure which to use')
  }

  const account = accounts[0]
  const gasPrice = GasPrice.fromString(process.env.GAS_PRICE)

  const client = await getSigningCosmWasmClient(process.env.RPC_URL, signer, {
    gasPrice: gasPrice
  })
  const chainId = await client.getChainId()

  if (chainId !== process.env.CHAIN_ID) {
    throw new Error(`Chain ID mismatch. Expected ${process.env.CHAIN_ID}, got ${chainId}`)
  }

  return { account, chainId, client, gasPrice }
}