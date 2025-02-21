import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';
import { CompanyPage } from '../pages/company';
import NovelList from '../features/NovelList';
import { Footer } from '../components/footer';
import { TermsPage } from '../pages/terms';
import { Box } from '@mui/material';
import { AccountSettings } from '../features/AccountSettings/AccountSettings';
import { DeleteAccountPage } from '../pages/deleteacounts';
import { AccountDeleted } from '../features/DeleteAccount/AccountDeleted';
import Login from '../pages/login';
import { NovelViewContainer } from '../features/NovelView/NovelViewContainer';

/**
 * ルーティング
 * TODO：URLは別途定義でも良いかも
 */
export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<NovelList />} />
          <Route path='/account' element={<AccountSettings />} />
          <Route path='/account-deleted' element={<AccountDeleted />} />
          <Route path='/company' element={<CompanyPage />} />
          <Route path='/list' element={<NovelList />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/deleteaccount' element={<DeleteAccountPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/novelView' element={<NovelViewContainer />} />
        </Route>
      </Routes>
    </>
  );
};

const Layout = () => {
  return (
    <Box display='flex' flexDirection='column' height='100%'>
      <HeaderBar />

      <main style={{ padding: '8px', flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </Box>
  );
};
