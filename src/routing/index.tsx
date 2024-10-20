import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';

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
      <Outlet />
    </>
  );
};
