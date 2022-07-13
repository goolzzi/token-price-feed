import { useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import ActionHeader from '../../components/ActionHeader';
import { JiriSelect, StyledOption } from '../../components/JiriSelect';

const CalculatorPicker = () => {
  const [value, setValue] = useState<number | null>(10);
  return (
    <>
      <Paper sx={{ padding: 0.375, borderRadius: 2, width: 500 }} elevation={4}>
        <ActionHeader
          name="Calculator"
          title="Determine a value"
          step="2"
          icon={<TuneIcon htmlColor="#fff" />}
        />
        <Paper sx={{ px: 1, py: 2, position: 'relative' }} elevation={0}>
          <Stack>
            <Typography sx={{ px: 1.5 }} fontSize={12}>
              Choose Calculation
            </Typography>
            {/* <JiriSelect value={value} onChange={setValue}>
              <StyledOption value={10}>Distance from margin call</StyledOption>
            </JiriSelect> */}
          </Stack>
        </Paper>
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

export default CalculatorPicker;
