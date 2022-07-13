import { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useApi } from '../../libs/hooks/api';
import { AaveStatus } from '../../types/aave';
import { useEthProvider } from '../../libs/hooks/useEthProvider';
import { useWatchData } from '../../libs/hooks/WatchData';

const AaveStatusHashKeyList = [
  {
    key: 'totalCollateral',
    name: 'Total Collateral',
    unit: 'ETH'
  },
  {
    key: 'totalDebt',
    name: 'Total Debt',
    unit: 'ETH'
  },
  {
    key: 'remainingCredit',
    name: 'Remaining Credit',
    unit: 'ETH'
  },
  // {
  //   key: 'currentLiquidationThreshold',
  //   name: 'Liquidation Threshold',
  //   unit: '%'
  // },
  // {
  //   key: 'loanToValue',
  //   name: 'Loan To Value',
  //   unit: '%'
  // },
  {
    key: 'healthFactor',
    name: 'Health Factor'
  },
  {
    key: 'dashboardBorrowingPowerUsed',
    name: 'Used Borrowing Power'
  },
  {
    key: 'dashboardLtv',
    name: 'LTV'
  }
];
const AccountDetail = () => {
  const api = useApi();
  const [aaveStatus, setAaveStatus] = useState<AaveStatus>({} as AaveStatus);
  const { account } = useEthProvider();
  const { updateNotify } = useWatchData();

  useEffect(() => {
    if (account) {
      console.log('##############', account);
      api.get<AaveStatus>(`/aave/status/${account}`).then((res) => {
        setAaveStatus(res.data);
        if (res.data.watch) {
          updateNotify(res.data.watch.notify);
        }
      });
      // api.get<AaveStatus>(`/aave/status/0x9EdDBc1539cdE204238cc6f9ED17C3137B82A05D`).then((res) => {
      //   setAaveStatus(res.data);
      // });
    }
  }, [account]);

  const renderValues = (item: { key: string, name: string, unit?: string }) => {
    if (item.unit === 'ETH') {
      return  <>{Number(aaveStatus[item.key as keyof AaveStatus]).toFixed(6)} {item.unit}</>
    } else if (item.key === 'healthFactor') {
      const healthFactor = Number(aaveStatus[item.key as keyof AaveStatus]).toFixed(3)
      if (healthFactor.includes('e')) {
        return <>N/A</>
      }
      return  <>{healthFactor}</>
    } else if (['dashboardBorrowingPowerUsed', 'dashboardLtv'].includes(item.key)) {
      return  <>{Number(aaveStatus[item.key as keyof AaveStatus]).toFixed(1)}</>
    } else {
      return <>{aaveStatus[item.key as keyof AaveStatus]} {item.unit}</>
    }
  }

  return (
    <Box sx={{ bgcolor: '#D3DCFF', borderRadius: 2, padding: 2 }}>
      <Grid container columnSpacing={3}>
        {AaveStatusHashKeyList.map((item) => (
          <Grid item xs={12} md={6} key={item.key}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}
            >
              <Typography
                fontSize={11}
                fontWeight="bold"
                letterSpacing="0.02em"
                color="common.black"
                minWidth={80}
                lineHeight="35px"
                whiteSpace="nowrap"
              >
                {item.name}
              </Typography>
              <Box>
                <Typography
                  color="common.black"
                  fontSize={13}
                  whiteSpace="nowrap"
                  lineHeight="35px"
                >
                  {renderValues(item)}
                </Typography>
                {/* TODO: Get conversion price from backend api
              {item.unit === 'ETH' && (
                <Typography color={alpha('#3A3C40', 0.5)} fontSize={14} lineHeight={1}>
                  $62.86 USD
                </Typography>
              )} */}
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccountDetail;
