import { Button, Grid, Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

const Image = styled('img')({
  width: 30,
  height: 30
});

const AccountSelector = () => {
  return (
    <>
      <Grid container spacing={3} px={1.5} mb={3.75}>
        <Grid item xs={6}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', pb: 1.25 }}>
            <Image src="/assets/images/wallets/aave.svg" />
            <Stack>
              <Typography fontSize={12} fontWeight="bold" color="secondary.main">
                AAVE Deposit 1.23ETH
              </Typography>
              <Typography fontSize={12} color={alpha('#3A3C40', 0.5)}>
                Mar 7 app.aave.com
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', pb: 1.25 }}>
            <Image src="/assets/images/wallets/aave.svg" />
            <Stack>
              <Typography fontSize={12} fontWeight="bold" color="secondary.main">
                AAVE Deposit 1.23ETH
              </Typography>
              <Typography fontSize={12} color={alpha('#3A3C40', 0.5)}>
                Mar 7 app.aave.com
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        disabled
        fullWidth
        sx={{ ':disabled': { backgroundColor: alpha('#219653', 0.5) } }}>
        Choose an account to continue
      </Button>
    </>
  );
};

export default AccountSelector;
