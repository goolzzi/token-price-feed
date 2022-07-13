import { Button, Paper } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddIcon from '@mui/icons-material/Add';
import ActionHeader from '../../components/ActionHeader';
import WalletLogin from './WalletLogin';

const AccountConnector = () => {
  return (
    <>
      <Paper sx={{ p: 0.375, borderRadius: 2, width: { xs: '100%', md: 500 } }} elevation={4}>
        <ActionHeader
          name="Account"
          title="Add Blockchain Account:"
          step="1"
          icon={<CreditCardIcon htmlColor="#fff" />}
        />
        <WalletLogin />
      </Paper>
      <Button
        color="secondary"
        variant="contained"
        sx={{ minWidth: 'unset', borderRadius: '50%', p: 0, width: 20, height: 20, my: 2 }}
      >
        <AddIcon fontSize="small" sx={{ fontSize: 14 }} />
      </Button>
    </>
  );
};

export default AccountConnector;
