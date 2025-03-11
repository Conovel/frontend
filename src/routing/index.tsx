import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';
import { CompanyPage } from '../pages/company';
import NovelList from '../features/NovelList';
import { Footer } from '../components/footer';
import { TermsPage } from '../pages/terms';
import { Box } from '@mui/material';
import { AccountSettings } from '../features/AccountSettings/AccountSettings';
import { DeleteAccountPage } from '../pages/deleteAccounts';
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
          <Route path='/Account' element={<AccountSettings />} />
          <Route path='/AccountDeleted' element={<AccountDeleted />} />
          <Route path='/Company' element={<CompanyPage />} />
          <Route path='/List' element={<NovelList />} />
          <Route path='/Terms' element={<TermsPage />} />
          <Route path='/DeleteAccount' element={<DeleteAccountPage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/NovelView' element={<NovelViewContainer />} />
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
