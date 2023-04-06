import React from 'react';
import { useRecoilState } from 'recoil';
import Dropdown from 'react-dropdown';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { WalletWindowKey } from '@sei-js/core';
import { useWallet } from '@sei-js/react';

import { selectedChainConfigAtom, customChainIdAtom, customRestUrlAtom, customRpcUrlAtom } from '../../recoil';
import styles from './styles.module.css'

const ChainInfo = () => {
	const wallet = useWallet();
	const [chainConfiguration, setChainConfiguration] = useRecoilState(selectedChainConfigAtom);
	const [customChainId, setCustomChainId] = useRecoilState(customChainIdAtom);
	const [customRestUrl, setCustomRestUrl] = useRecoilState(customRestUrlAtom);
	const [customRpcUrl, setCustomRpcUrl] = useRecoilState(customRpcUrlAtom);


	const { chainId, restUrl, rpcUrl, installedWallets, connectedWallet, setInputWallet } = wallet;

  const supportedWallets: WalletWindowKey[] = ['keplr', 'leap']

	const renderSupportedWallet = (walletKey: WalletWindowKey) => {
		const isWalletInstalled = installedWallets.includes(walletKey);
		const isWalletConnected = connectedWallet === walletKey;

		const onClickWallet = () => {
			if (isWalletInstalled && setInputWallet) {
				setInputWallet(walletKey);
			} else {
				switch (walletKey) {
					case 'keplr':
						window.open('https://www.keplr.app/download', '_blank');
						return;
					case 'leap':
						window.open('https://www.leapwallet.io/', '_blank');
						return;
					case 'coin98':
						window.open('https://coin98.com/wallet', '_blank');
						return;
					case 'falcon':
						window.open('https://www.falconwallet.app', '_blank');
						return;

				}
			}
		};

		const getButtonText = () => {
			if (isWalletInstalled) {
				if (isWalletConnected) return `connected to ${walletKey}`;
				return `connect to ${walletKey}`;
			}

			return `install ${walletKey}`;
		};

		return (
			<div className={styles.walletButton} onClick={onClickWallet} key={walletKey}>
				{isWalletConnected && <IoCheckmarkCircleSharp className='connectedIcon' />}
				{getButtonText()}
			</div>
		);
	};

	return (
		<div className='card'>
			<div className='connect'>{supportedWallets.map(renderSupportedWallet)}</div>
		</div>
	);
};

export default ChainInfo;
