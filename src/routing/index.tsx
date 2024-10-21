import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';
import { CompanyPage } from '../pages/company';
import Box from '@mui/material/Box';

/**
 * ルーティング
 * TODO：URLは別途定義でも良いかも
 */
export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index />
          <Route path='/account' />
          <Route path='/company' element={<CompanyPage />} />
          <Route path='/terms' />
        </Route>
      </Routes>
    </>
  );
};

const Layout = () => {
  return (
    <>
      <HeaderBar />

      <Box sx={{ width: '100%', height: '100vh' }}>
        <Box sx={{ paddingX: '16px', paddingTop: '56px' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
