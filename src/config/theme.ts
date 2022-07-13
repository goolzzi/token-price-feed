import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#219653'
    },
    secondary: {
      main: '#1B1C1E'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;
