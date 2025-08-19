import { Outlet, Route, Routes } from 'react-router';
import HeaderBar from '../components/header';
import { CompanyPage } from '../pages/company';
import NovelListPage from '../pages/novelList';
import NovelViewPage from '../pages/novelView';
import { Footer } from '../components/footer';
import { TermsPage } from '../pages/terms';
import { Box } from '@mui/material';
import AccountSettingsPage from '../pages/accountSettings';
import { DeleteAccountPage } from '../pages/deleteAccount';
import AccountDeletedPage from '../pages/accountDeleted';
import Login from '../pages/login';

/**
 * ルーティング
 * TODO：URLは別途定義でも良いかも
 */
export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<NovelListPage />} />
          <Route path='/account' element={<AccountSettingsPage />} />
          <Route path='/accountDeleted' element={<AccountDeletedPage />} />
          <Route path='/company' element={<CompanyPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/deleteAccount' element={<DeleteAccountPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/novelView' element={<NovelViewPage />} />
          <Route
            path='/novelView/:titleId/:sentenceId'
            element={<NovelViewPage />}
          />
        </Route>
      </Routes>
    </>
  );
};

const Layout = () => {
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      <HeaderBar />

      <main style={{ padding: '8px', flexGrow: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </Box>
  );
};
