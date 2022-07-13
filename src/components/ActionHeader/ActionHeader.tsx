import { Stack, Typography } from '@mui/material';

interface ActionHeader {
  name: string;
  title: string;
  step: string;
  icon: React.ReactNode;
}

const ActionHeader = ({ name, title, step, icon }: ActionHeader) => {
  return (
    <Stack
      direction="row"
      sx={{ bgcolor: 'secondary.main', px: 2.75, py: 1.25, borderRadius: 2 }}
      justifyContent="space-between"
      alignItems="center">
      <Stack direction="column">
        <Typography variant="subtitle2" color="common.white" fontSize={11}>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="common.white" fontSize={18} fontWeight="bold">
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography color="common.white" fontSize={12}>
          {step}
        </Typography>
        {icon}
      </Stack>
    </Stack>
  );
};

export default ActionHeader;
