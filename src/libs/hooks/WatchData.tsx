import * as React from 'react';
import { useEthProvider } from './useEthProvider';

export interface KeeperValues {
  contract_address: string;
  abi: unknown;
  function: string;
}

export interface NotifyInfo {
  Email?: string;
  Text?: string;
  Telegram?: string;
  Keeper?: KeeperValues
}

interface PriceFeed {
  exchange: string[];
  interval?: number;
  priceWindowSize?: number;
  base?: string;
  quote?: string;
}

interface WatchContextValue {
  threshold: string;
  priceFeedData: PriceFeed;
  notify: NotifyInfo;
  setThreshold: (val: string) => void;
  setNotifyApp: (name: keyof NotifyInfo, value: string | KeeperValues) => void;
  updateNotify: (notify: NotifyInfo) => void;
  setPriceFeedData: (value: PriceFeed) => void;
}

const WatchContext = React.createContext<WatchContextValue>({} as WatchContextValue);

export const WatchProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { account } = useEthProvider();
  const [threshold, setThreshold] = React.useState('1.0');
  const [priceFeedData, setPriceFeedData] = React.useState<PriceFeed>({ exchange: [] });
  const [notify, setNotify] = React.useState<NotifyInfo>({});

  React.useEffect(() => {
    if (!account) {
      setNotify({});
    }
  }, [account]);

  const setNotifyApp = (name: keyof NotifyInfo, value: string | KeeperValues) => {
    setNotify((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateNotify = (notify: NotifyInfo) => {
    setNotify({ ...notify });
  };
  return (
    <WatchContext.Provider
      value={{ notify, priceFeedData, threshold, setThreshold, setNotifyApp, updateNotify, setPriceFeedData }}
    >
      {children}
    </WatchContext.Provider>
  );
};

export const useWatchData = (): WatchContextValue => React.useContext(WatchContext);
