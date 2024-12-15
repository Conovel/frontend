import { Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';
//import { CompanyPage } from '../pages/company';
import NovelList from '../features/NovelList';
//import { Footer } from '../components/footer';

/**
 * ルーティング
 * TODO：URLは別途定義でも良いかも
 */
export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/list' element={<NovelList />} />
          <Route path='/account' />
          {/* <Route path='/company' element={<CompanyPage />} /> */}
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

      <main style={{ padding: '8px' }}>{/* <Outlet /> */}</main>
      {/* <Footer /> */}
    </>
  );
};
