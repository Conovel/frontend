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

      <Box sx={{ paddingX: '80px', paddingY: '56px' }}>
        <Box sx={{ paddingX: '16px' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
