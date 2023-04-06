import React, { useEffect, useMemo, useState } from 'react';
import { IoCopySharp, IoSendSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useQueryClient, useWallet } from '@sei-js/react';

import { BalanceResponseType } from '../../types';
import styles from './styles.module.css'
import {Card, CardContent, Divider, Stack} from '@mui/material'

const AccountInfo = () => {
	const { offlineSigner, accounts } = useWallet();
	const { queryClient } = useQueryClient();

	const [walletBalances, setWalletBalances] = useState<BalanceResponseType[]>([]);

	const walletAccount = useMemo(() => accounts?.[0], [accounts]);

	useEffect(() => {
		const fetchBalances = async () => {
			if (queryClient && walletAccount) {
				const { balances } = await queryClient.cosmos.bank.v1beta1.allBalances({ address: walletAccount.address });
				return balances as BalanceResponseType[];
			}
			return [];
		};

		fetchBalances().then(setWalletBalances);
	}, [offlineSigner]);

	const renderBalances = () => {
		if (!walletAccount) {
			return <p>Wallet not connected</p>;
		}
		if (walletBalances.length === 0) {
			return (
				<div>
					<p>No tokens available</p>
				</div>
			);
		}

		return walletBalances?.map((balance) => {
			return (
				<Stack key={balance.denom} spacing={0.5}>
					<div className={styles.tokenAmount}>{balance.amount}</div>
					<div className={styles.tokenDenom}>{balance.denom}</div>
				</Stack>
			);
		});
	};

	const onClickCopy = () => {
		toast.info('Copied address to clipboard!');
		navigator.clipboard.writeText(walletAccount?.address || '').then();
	};

	return (
		<Card>
      <CardContent>


      <h3>Account Info</h3>
				<Stack direction='row' alignItems='center'>
					{walletAccount?.address || 'No account found!'}
          {walletAccount?.address && <IoCopySharp className={styles.copy} onClick={onClickCopy} />}
				</Stack>
        <h3>Balances</h3>
				<Stack divider={<Divider flexItem />} spacing={2}>
          {renderBalances()}
        </Stack>
      </CardContent>
		</Card>
	);
};

export default AccountInfo;
