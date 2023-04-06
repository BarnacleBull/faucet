import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useWallet } from '@sei-js/react'

import {
  Button,
  CircularProgress
} from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { AccountData } from '@cosmjs/proto-signing'
import axios from 'axios'
import {useRefetchQueries} from "@sparrowswap/hooks/useRefetchQueries";

const RequestButton = () => {
	const { accounts } = useWallet();
	const walletAccount = useMemo(() => accounts?.[0], [accounts]);

  const refetchBalances = useRefetchQueries(['balances'], 1500)

  const { mutate: requestFaucet, isLoading } = useMutation(
    async (account: AccountData) => {
      const { data: response } = await axios.get('/api/faucet', {params: {dest: account.address}})
      console.log(response.data)
    },
    {
      onSuccess: () => {
        console.log('success')
        toast.success('Faucet request successful!')
        refetchBalances()
      },
      onError: (error) => {
        console.log(error)
        toast.error((error as any)?.message ?? error?.toString())
      }
    }
  )

	return (
		<Button
      disabled={isLoading || !walletAccount}
      color='primary'
      variant='contained'
      size='large'
      startIcon = {
        isLoading ? <CircularProgress color="inherit" size={25} /> : null
      }
      onClick={() => requestFaucet(walletAccount)}
    >
      Request
    </Button>
	);
};

export default RequestButton;
