import * as React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
  Stack,
  Typography,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddIcon from '@mui/icons-material/Add';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import NumbersIcon from '@mui/icons-material/Numbers';
import ActionHeader from '../../components/ActionHeader';
import { JiritsuMultiSelect, StyledOption } from '../../components/JiriSelect/MultiSelect';
import { useWatchData } from '../../libs/hooks/WatchData';
import { useApi } from '../../libs/hooks/api';

const ExchangeSelector = () => {
  const [exSources, setExSources] = React.useState<string[]>([]);
  const [coins, setCoins] = React.useState<string[]>([]);
  const { priceFeedData, setPriceFeedData } = useWatchData();
  const api = useApi();

  React.useEffect(() => {
    api.get<{ coins: string[]; sources: string[] }>('/feed/coin-sources').then((res) => {
      const { coins, sources } = res.data;
      setExSources(sources);
      setCoins(coins);
    });
  }, []);

  return (
    <>
      <Paper sx={{ padding: 0.375, borderRadius: 2, width: { xs: '100%', md: 500 } }} elevation={4}>
        <ActionHeader
          name="Trigger"
          title="Choose your Exchanges:"
          step="2"
          icon={<CurrencyExchangeIcon htmlColor="#fff" />}
        />
        <Accordion disableGutters elevation={0} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                fontSize={11}
                color="common.black"
                lineHeight="35px"
                fontWeight="bold"
                whiteSpace="nowrap"
              >
                STEP 1
              </Typography>

              <Typography fontSize={12} color="secondary.main">
                Choose an Exchange
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <JiritsuMultiSelect
              value={priceFeedData.exchange}
              onChange={(value) => setPriceFeedData({ ...priceFeedData, exchange: value })}
              renderValue={(option) => (
                <span>
                  {option.length
                    ? option.map((op) => op.value).join(', ')
                    : 'Select an Exchange...'}
                </span>
              )}
            >
              {exSources.map((ex, idx) => (
                <StyledOption key={idx} value={ex}>
                  {ex}
                </StyledOption>
              ))}
            </JiritsuMultiSelect>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters elevation={0} disabled={!priceFeedData.exchange}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                fontSize={11}
                color="common.black"
                lineHeight="35px"
                fontWeight="bold"
                whiteSpace="nowrap"
              >
                STEP 2
              </Typography>
              <Typography fontSize={12} color="secondary.main">
                Choose a Coin Pair
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Base Coin</InputLabel>
                <Select
                  value={priceFeedData.base}
                  label="Base Coin"
                  onChange={(evt) => setPriceFeedData({ ...priceFeedData, base: evt.target.value })}
                  displayEmpty={false}
                >
                  <MenuItem value="" disabled>
                    <em>None</em>
                  </MenuItem>
                  {coins.map((coin) => (
                    <MenuItem key={coin} value={coin}>
                      {coin}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" disabled={!priceFeedData.base}>
                <InputLabel>Quote Coin</InputLabel>
                <Select
                  value={priceFeedData.quote}
                  label="Quote Coin"
                  onChange={(evt) =>
                    setPriceFeedData({ ...priceFeedData, quote: evt.target.value })
                  }
                  displayEmpty={false}
                >
                  <MenuItem value="" disabled>
                    <em>None</em>
                  </MenuItem>
                  {coins
                    .filter((coin) => coin !== priceFeedData.base)
                    .map((coin) => (
                      <MenuItem key={coin} value={coin}>
                        {coin}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion disableGutters elevation={0} disabled={!priceFeedData.quote}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                fontSize={11}
                color="common.black"
                lineHeight="35px"
                fontWeight="bold"
                whiteSpace="nowrap"
              >
                STEP 3
              </Typography>
              <Typography fontSize={12} color="secondary.main">
                Choose Price Feed Frequency
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl variant="standard">
              <InputLabel>Frequency (Minutes)</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <AvTimerIcon />
                  </InputAdornment>
                }
                value={priceFeedData.interval}
                placeholder="10"
                type="number"
                onChange={(evt) =>
                  setPriceFeedData({ ...priceFeedData, interval: +evt.target.value })
                }
              />
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion disableGutters elevation={0} disabled={!priceFeedData.interval}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                fontSize={11}
                color="common.black"
                lineHeight="35px"
                fontWeight="bold"
                whiteSpace="nowrap"
              >
                STEP 4
              </Typography>
              <Typography fontSize={12} color="secondary.main">
                Number of Price Feed Checks
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <NumbersIcon />
                </InputAdornment>
              }
              placeholder="5"
              value={priceFeedData.priceWindowSize}
              type="number"
              onChange={(evt) =>
                setPriceFeedData({ ...priceFeedData, priceWindowSize: +evt.target.value })
              }
            />
          </AccordionDetails>
        </Accordion>
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

export default ExchangeSelector;
