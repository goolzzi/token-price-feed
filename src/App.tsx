import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TopNav from './components/TopNav';
import HomePage from './containers/home';
import UnsubscribePage from './containers/unsubscribe/Unsubscribe';

function App() {
  return (
    <>
      <ToastContainer />
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unsubscribe/:address/:coin_pair" element={<UnsubscribePage />} />
      </Routes>
    </>
  );
}

export default App;
