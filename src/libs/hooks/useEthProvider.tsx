import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getMetaMaskProvider } from '../ethers';
import { isMobileDevice } from '../utils';

interface EthContextValues {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  account: string;
  connectMetamask: () => void;
}

const EthContext = createContext<EthContextValues>({
  provider: null,
  account: '',
  connectMetamask: () => null,
  signer: null
});

interface EthContextProviderProps {
  children: React.ReactNode;
}

export const EthContextProvider = ({ children }: EthContextProviderProps) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const connectMetamask = async () => {
    const externalProvider = getMetaMaskProvider();
    const provider = new ethers.providers.Web3Provider(externalProvider, 'any');
    const signer = provider.getSigner();
    setSigner(signer);
    setProvider(provider);
    const [account] = await provider.send('eth_requestAccounts', []);
    setAccount(account);
  };

  const handleAccountChanged = (accounts: string[]) => {
    setAccount(accounts[0]);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!isMobileDevice()) window.ethereum.on('accountsChanged', handleAccountChanged);

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!isMobileDevice())
        window.ethereum.removeListener('accountsChanged', handleAccountChanged);
    };
  }, [provider]);

  return (
    <EthContext.Provider value={{ provider, account, connectMetamask, signer }}>
      {children}
    </EthContext.Provider>
  );
};

export const useEthProvider = (): EthContextValues => useContext(EthContext);
