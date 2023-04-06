import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { useWallet } from '@sei-js/react'

import {
  Button,
  CircularProgress
} from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { AccountData } from '@cosmjs/proto-signing'
import axios from 'axios'

const RequestButton = () => {
	const { accounts } = useWallet();
  const queryClient = useQueryClient()
	const walletAccount = useMemo(() => accounts?.[0], [accounts]);

  const { mutate: requestFaucet, isLoading } = useMutation(
    async (account: AccountData) => {
      const { data: response } = await axios.get('/api/faucet', {params: {dest: account.address}})
      console.log(response.data)
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
