import { Stack } from '@mui/material';
import AccountConnector from '../AccoutConnector';
import ActionPerform from '../ActionPerform';
import ExchangeSelector from '../ExchangeSelector';

const Home = () => {
  return (
    <Stack sx={{ mb: 5, px: { xs: 1.5, md: 0 } }} alignItems="center">
      <AccountConnector />

      <ExchangeSelector />

      <ActionPerform />
    </Stack>
  );
};

export default Home;
