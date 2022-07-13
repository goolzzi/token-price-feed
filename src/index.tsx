import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { EthContextProvider } from './libs/hooks/useEthProvider';
import { ApiContextProvider } from './libs/hooks/api';
import { WatchProvider } from './libs/hooks/WatchData';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApiContextProvider>
        <EthContextProvider>
          <WatchProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WatchProvider>
        </EthContextProvider>
      </ApiContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
