import { Box, Button, Container, Toolbar, Tooltip } from '@mui/material';
import { useEthProvider } from '../../libs/hooks/useEthProvider';

const TopNav = () => {
  const { account, connectMetamask } = useEthProvider();

  return (
    <Box>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            height: 60,
            alignItems: 'center'
          }}
        >
          <Box component="img" src="/logo.svg" alt="jiritsu" />
          <Tooltip title="Disconnect via Metamask extension" arrow={true} disableHoverListener={!account}>
            <span>
              <Button
                variant="contained"
                sx={{ fontSize: 12, borderRadius: 4, px: 4 }}
                color="secondary"
                disabled={!!account}
                onClick={connectMetamask}
              >
                {account ? 'Disconnect' : 'Connect'}
              </Button>
            </span>
          </Tooltip>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default TopNav;
