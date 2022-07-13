import * as React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  OutlinedInput,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { styled, css } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ActionHeader from '../../components/ActionHeader';
import { alpha } from '@mui/system';
import SearchInput from '../../components/SearchInput';
import { useApi } from '../../libs/hooks/api';
import { useWatchData } from '../../libs/hooks/WatchData';
import { useEthProvider } from '../../libs/hooks/useEthProvider';
import KeeperForm from './KeeperForm';

const Image = styled('img') <{ size?: number; isActive: boolean }>`
  width: ${(props) => props.size || 50}px;
  height: ${(props) => props.size || 50}px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      outline: 2px auto #219653;
    `}
`;

const ACTION_LIST = [
  {
    id: 'telegram',
    name: 'Telegram'
  },
  {
    id: 'email',
    name: 'Email'
  },
  {
    id: 'keeper',
    name: 'Keeper'
  },
  {
    id: 'whatsapp',
    name: 'Whatsapp'
  },
  {
    id: 'metamask',
    name: 'Metamask'
  },
  {
    id: 'sms',
    name: 'SMS'
  }
];

enum ActionApps {
  Telegram = 'telegram',
  Email = 'email',
  Whatsapp = 'whatsapp',
  SMS = 'sms',
  Metamask = 'metamask',
  Keeper = 'keeper'
}

const ActionPerform = () => {
  const [activeActions, setActiveActions] = React.useState<string[]>([]);
  const { notify, updateNotify, priceFeedData } = useWatchData();
  const api = useApi();
  const { account } = useEthProvider();
  const [searchInput, setSearchInput] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [notifyAppData, setNotifyAppData] = React.useState(notify);


  React.useEffect(() => {
    setActiveActions(Object.keys(notify).map((app) => ActionApps[app as keyof typeof ActionApps]));
    setNotifyAppData(notify);
  }, [notify]);

  const handleClickAction = (actionName: string) => {
    const idx = activeActions.indexOf(actionName);

    if (idx === -1) {
      setActiveActions([...activeActions, actionName]);
      if (actionName === 'telegram' && !notify.Telegram) {
        const uuid = uuidv4();
        setNotifyAppData({ ...notifyAppData, Telegram: uuid });
      }
    } else {
      setActiveActions((prev) => {
        prev.splice(idx, 1);

        return [...prev];
      });
    }
  };

  const handleClickComplete = async () => {
    setSubmitting(true);
    console.log(notifyAppData, '$$$$$$')
    const payload = {
      poll_interval: priceFeedData.interval ? priceFeedData.interval * 60 : 0 * 60,
      price_window_size: priceFeedData.priceWindowSize,
      exchange_list: priceFeedData.exchange,
      combine_exchanges_method: 'flat_average',
      average_method: 'TWAP',
      notify_channels: {
        ...notifyAppData
      }
    };

    const coin_pair = `${priceFeedData.base?.toUpperCase()}-${priceFeedData.quote?.toUpperCase()}`;
    await api.post<any>(`/feed/${account}/${coin_pair}`, payload);
    // await api.post<any>(`/aave/watch/${account}`, payload);
    updateNotify(notifyAppData);
    setSubmitting(false);
    toast.success('Price Feed created!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });
  };

  const handleClickTelegram = async () => {
    window.open(
      `https://web.telegram.org/k/#?tgaddr=tg%3A%2F%2Fresolve%3Fdomain%3Djiritsu_price_feed_bot%26start%3D${notifyAppData.Telegram}`
    );
  };

  const checkInvalidateFields = () => {
    return (
      (activeActions.includes('email') && !notifyAppData.Email) ||
      (activeActions.includes('Keeper') &&
        (!notifyAppData.Keeper?.function || !notifyAppData.Keeper.contract_address))
    );
  };

  return (
    <>
      <Paper sx={{ padding: 0.375, borderRadius: 2, width: { xs: '100%', md: 500 } }} elevation={4}>
        <ActionHeader
          name="Action"
          title="Perform an action:"
          step="3"
          icon={<EmailOutlinedIcon htmlColor="#fff" />}
        />
        <Accordion disableGutters elevation={0}>
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
                Choose one or more applications to receive alerts from
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" sx={{ mb: 3, gap: 1.25, flexWrap: 'wrap' }}>
              {ACTION_LIST.filter(
                (action) => action.id.includes(searchInput) || activeActions.includes(action.id)
              ).map((action) => (
                <Image
                  key={action.id}
                  src={`/assets/images/apps/${action.id}.png`}
                  onClick={() => handleClickAction(action.id)}
                  isActive={activeActions.includes(action.id)}
                />
              ))}
            </Stack>
            <SearchInput
              value={searchInput}
              onChange={(evt) => setSearchInput(evt.currentTarget.value)}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters elevation={0}>
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
                Choose an action
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ position: 'relative' }} elevation={0}>
              {activeActions.includes('email') && (
                <Paper sx={{ my: 1, p: 1, display: 'flex', alignItems: 'center' }}>
                  <img
                    key="email"
                    src="/assets/images/apps/email.png"
                    style={{ paddingRight: 8 }}
                  />
                  <FormControl variant="outlined" fullWidth margin="none">
                    <OutlinedInput
                      sx={{ borderRadius: 4.5 }}
                      inputProps={{
                        sx: { py: 0.75, pl: 2, fontSize: 15 },
                        placeholder: 'Email address',
                        type: 'email'
                      }}
                      value={notify.Email}
                      onChange={(evt) =>
                        setNotifyAppData({ ...notifyAppData, Email: evt.currentTarget.value })
                      }
                    />
                  </FormControl>
                </Paper>
              )}

              {activeActions.includes('telegram') && (
                <Paper sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                  <img
                    key="telegram"
                    src="/assets/images/apps/telegram.png"
                    style={{ paddingRight: 8 }}
                  />
                  <Button fullWidth variant="contained" onClick={handleClickTelegram}>
                    Connect Telegram
                  </Button>
                </Paper>
              )}

              {activeActions.includes('keeper') &&
                <KeeperForm
                  notifyAppData={notifyAppData}
                  setNotifyAppData={setNotifyAppData}
                />}

              {!!activeActions.length && (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={checkInvalidateFields() || submitting || !account}
                  fullWidth
                  sx={{ ':disabled': { backgroundColor: alpha('#219653', 0.5) }, mt: 1.5 }}
                  onClick={handleClickComplete}
                >
                  {Object.keys(notify).length > 0 ? 'Update' : 'Create'} Alerts
                </Button>
              )}
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
};

export default ActionPerform;
