import { LoginPresenter } from './LoginPresenter';
import { OGP } from '../../components/ogp';

export const Login = () => {
  return (
    <>
      <OGP
        title='ログイン'
        description='Conovelにログインして、小説の続きを書いたり、投稿を楽しもう。'
        url='/login'
      />
      <LoginPresenter />
    </>
  );
};
