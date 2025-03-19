import { LoginPresenter } from './LoginPresenter';
import { useLocation } from 'react-router-dom';

export const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showFirstTimeLogin = searchParams.get('firstTime') === 'true';

  return <LoginPresenter autoOpenFirstTimeLogin={showFirstTimeLogin} />;
};
