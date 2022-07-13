import { ethers } from 'ethers';
import { isMobileDevice } from './utils';

class NoMetamaskError extends Error {
  code: number;
  constructor() {
    super();
    this.code = 0;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NoMetamaskError.prototype);
  }
}

export const getMetaMaskProvider = (): ethers.providers.ExternalProvider => {
  if (!window.ethereum) {
    if (isMobileDevice()) {
      window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
    }
    throw new NoMetamaskError();
  }

  const { providers } = window.ethereum;
  let provider = null;
  if (providers) {
    provider = providers.find((provider: any) => provider.isMetaMask);
  } else if (window.ethereum.isMetaMask) {
    provider = window.ethereum;
  } else {
    throw new NoMetamaskError();
  }
  return provider;
};
