import * as React from 'react';
import { ethers } from 'ethers';
import { useDropzone } from 'react-dropzone';
import { Box, Button, FormControl, OutlinedInput, Paper, Stack } from '@mui/material';
import { JiriSelect, StyledOption } from '../../components/JiriSelect';
import { useWatchData, KeeperValues, NotifyInfo } from '../../libs/hooks/WatchData';
import { useEthProvider } from '../../libs/hooks/useEthProvider';
import { useApi } from '../../libs/hooks/api';

interface KeeperFormProps {
  notifyAppData: NotifyInfo,
  setNotifyAppData: (value: NotifyInfo) => void
}

const KeeperForm = ({ notifyAppData , setNotifyAppData  }: KeeperFormProps) => {
  const { account, signer } = useEthProvider();
  const api = useApi();
  const [keeperFunctions, setKeeperFunctions] = React.useState<any[]>([]);
  const [gasFee, setGasFee] = React.useState('');

  const onReaderLoad = (event: ProgressEvent<FileReader>) => {
    const abiArray = JSON.parse((event.target?.result as string) || '{}');
    setNotifyAppData({
      ...notifyAppData,
      Keeper: {
        ...notifyAppData.Keeper,
        abi: abiArray
      } as KeeperValues
    });
    
    setKeeperFunctions(abiArray.filter((func: any) => func.type === 'function'));
  };

  const onDrop = React.useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(acceptedFiles[0]);
  }, [notifyAppData]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/JSON',
    multiple: false,
    onDrop
  });

  const handleChangeContractAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const contract_address = evt.target.value.replace(/[^0-9a-fA-Fx]/g, '');
    setNotifyAppData({
      ...notifyAppData,
      Keeper: {
        ...notifyAppData.Keeper,
        contract_address
      } as KeeperValues
    });
  };

  const handleSendGasFee = () => {
    api.get<{ address: string; network_id: string }>('/feed/address').then((res) => {
      const address = res.data.address;
      console.log('#### Sending Gas Payment To: ', address);
      if (account && signer && address) {
        signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther(gasFee)
        });
      }
    });
  };

  return (
    <Paper sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
      <img key="telegram" src="/assets/images/apps/keeper.png" style={{ paddingRight: 8 }} />
      <Stack spacing={1} flex={1} position="relative">
        <FormControl variant="outlined" fullWidth margin="none">
          <OutlinedInput
            sx={{ borderRadius: 4.5 }}
            value={notifyAppData.Keeper?.contract_address || ''}
            onChange={handleChangeContractAddress}
            inputProps={{
              sx: { py: 0.75, pl: 2, fontSize: 15 },
              placeholder: 'Contract Address'
            }}
          />
        </FormControl>
        {!keeperFunctions.length && (
          <Box
            {...getRootProps({ className: 'dropzone' })}
            sx={{
              minHeight: 50,
              borderWidth: 2,
              borderColor: 'primary.main',
              borderStyle: 'dashed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              borderRadius: 18,
              bgcolor: '#eeeeee',
              cursor: 'pointer'
            }}
          >
            <input {...getInputProps()} />
            <p>Drag & Drop the API file or click here to select file.</p>
          </Box>
        )}
        {!!keeperFunctions.length && (
          <JiriSelect
            value={notifyAppData.Keeper?.function}
            onChange={(value: string | null) => 
              setNotifyAppData({
                ...notifyAppData,
                Keeper: { ...notifyAppData.Keeper, function: value } as KeeperValues
              })
            }
          >
            {keeperFunctions.map((func, idx) => (
              <StyledOption key={idx} value={func.name}>
                {func.name}
              </StyledOption>
            ))}
          </JiriSelect>
        )}
        <FormControl variant="outlined" fullWidth margin="none" sx={{ position: 'relative' }}>
          <OutlinedInput
            sx={{ borderRadius: 4.5 }}
            inputProps={{
              sx: { py: 0.75, pl: 2, pr: 16, fontSize: 15 },
              placeholder: 'Gas Payment',
              step: 0.01
            }}
            type="number"
            value={gasFee}
            onChange={(evt) => setGasFee(evt.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              position: 'absolute',
              right: 4,
              height: 'calc(100% - 6px)',
              top: '50%',
              transform: 'translateY(-50%)',
              borderRadius: 4.5
            }}
            disabled={!gasFee}
            disableElevation
            onClick={handleSendGasFee}
          >
            Pay Gas Now
          </Button>
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default KeeperForm;
