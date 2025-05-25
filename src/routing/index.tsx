import { Outlet, Route, Routes } from 'react-router';
import HeaderBar from '../components/header';
import { CompanyPage } from '../pages/company';
import NovelList from '../features/NovelList';
import { Footer } from '../components/footer';
import { TermsPage } from '../pages/terms';
import { Box } from '@mui/material';
import { AccountSettings } from '../features/AccountSettings/AccountSettings';
import { DeleteAccountPage } from '../pages/deleteAccount';
import { AccountDeleted } from '../features/DeleteAccount/AccountDeleted';
import Login from '../pages/login';
import NovelViewContainer from '../features/NovelView/NovelViewContainer';

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
          <Route path='/accountDeleted' element={<AccountDeleted />} />
          <Route path='/company' element={<CompanyPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/deleteAccount' element={<DeleteAccountPage />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/novelView/:sentence_id'
            element={<NovelViewContainer />}
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
