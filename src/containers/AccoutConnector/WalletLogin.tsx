import { Box, Button, Grid, Stack, Typography, Tooltip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchInput from '../../components/SearchInput';
import { useEthProvider } from '../../libs/hooks/useEthProvider';

const Image = styled('img')({
  width: 25,
  height: 25,
  padding: 3,
  borderRadius: 5,
  border: '2px solid rgba(0, 0, 0, 0.1)'
});

const WALLET_LIST = [
  {
    id: 'metamask',
    name: 'Metamask',
    active: true
  },
  {
    id: 'wallet-connect',
    name: 'Wallet Connect'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet'
  },
  {
    id: 'fortmatic',
    name: 'Fortmatic'
  },
  {
    id: 'torus',
    name: 'Torus'
  },
  {
    id: 'ledger',
    name: 'Ledger'
  }
];

const WalletLogin = () => {
  const { account, connectMetamask } = useEthProvider()
  const handleClickConnect = (id: string) => async () => {
    if (id === 'metamask') {
      connectMetamask()
    }
  }

  return (
    <Box px={2.5} py={2}>
      <SearchInput />
      <Stack sx={{ p: 1.5 }}>
        <Grid container columnSpacing={3}>
          {WALLET_LIST.map((wallet, idx) => (
            <Grid item xs={6} key={wallet.id}>
              <Tooltip title="Coming soon" disableHoverListener={wallet.active} arrow>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    borderBottom: idx < 4 ? '1px solid rgba(0, 0, 0, 0.2)' : undefined,
                    py: 1.5,
                    cursor: wallet.active ? 'pointer' : 'default',
                    opacity: wallet.active ? 1 : 0.7
                  }}
                  onClick={handleClickConnect(wallet.id)}
                >
                  <Image src={`/assets/images/wallets/${wallet.id}.png`} />
                  <Typography
                    variant="body1"
                    fontSize={12}
                    color="secondary.main"
                    fontWeight="bold"
                  >
                    {wallet.name}
                  </Typography>
                </Stack>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
        <Typography color="#1B1C1E" fontSize={11} lineHeight="15px" sx={{ opacity: 0.5 }}>
          or one of our other 50+ supported wallets
        </Typography>
      </Stack>
      {!account && <Button
        variant="contained"
        color="primary"
        disabled
        fullWidth
        sx={{ ':disabled': { backgroundColor: alpha('#219653', 1), color: 'white' } }}
      >
        Login to a wallet to continue
      </Button>}
    </Box>
  );
};

export default WalletLogin;
