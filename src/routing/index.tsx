import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';
import NovelList from '../features/NovelList';

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
          <Route path='/account' />
          <Route path='/company' />
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

      <main style={{ width: '100%', paddingTop: '80px' }}>
        <Outlet />
      </main>
    </>
  );
};
