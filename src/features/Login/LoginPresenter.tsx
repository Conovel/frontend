import {
  Box,
  Typography,
  Container,
  Button,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
  // TextField,
  Divider,
} from '@mui/material';
import { useAuth } from '../../providers/auth';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';

export const LoginPresenter = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  // const [isFirstTimeLoginModalOpen, setIsFirstTimeLoginModalOpen] =
    useState(false);
  // const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL;
  const { setToken, currentUserId, logout } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setToken(token);
      localStorage.setItem('auth', token);
    }
  }, [setToken, navigate]);

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${authBaseUrl}/auth/google_oauth2`;
  };

  
  // const handleCompleteOnboarding = () => {
  //   // ユーザー名など初回設定情報を保存する処理をここに追加
  //   console.log('初回設定が完了しました。ユーザー名:', username);
  //   setIsFirstTimeLoginModalOpen(false);

  //   // ログイン完了後にホームページなどに遷移
  //   navigate('/');
  // };

  // const handleSkipOnboarding = () => {
  //   setIsFirstTimeLoginModalOpen(false);
  //   navigate('/');
  // };

  // const openFirstTimeLoginModal = () => {
  //   setIsFirstTimeLoginModalOpen(true);
  // };

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          ログイン
        </Typography>


        <>
          {/* 
          　ログイン済みの場合はログアウトボタンとマイページへのリンクを表示
          　そうでない場合はログインボタンを表示
          */}
          {console.log('currentUserId:', currentUserId)}
          {currentUserId ? (
            <>
              <Button
                variant='outlined'
                color='primary'
                onClick={logout}
                sx={{ width: '240px' }}
              >
                ログアウト
              </Button>

              <Divider sx={{ width: '100%', my: 2 }}>または</Divider>
              
              <Link to='/account' className='btn btn-accent gap-2 w-full'>
                マイページへ
              </Link>
            </>
          ) : (
            /* MEMO：ここに新規登録とログインを兼ねたボタンとわかるテキストを追加する？ */
            /* MEMO：ボタン押下→Googleアカウント選択→既存ユーザーならログイン、なければユーザー追加 */
            <Button
              variant='outlined'
              color='primary'
              onClick={handleGoogleAuth}
              sx={{ width: '240px' }}
            >
              Googleログイン
            </Button>
          )}
        </>


        {/* MEMO：新規登録とログインボタンを統合する方針の場合、下記のボタンは削除する */}
        {/* <Button
          variant='outlined'
          color='primary'
          onClick={openFirstTimeLoginModal}
          sx={{ width: '240px' }}
        >
          初回ログイン
        </Button> */}

        {loginError && <Typography color='error'>{loginError}</Typography>}
      </Box>

      {/* 初回ログイン用モーダル */}
      {/* <Dialog
        open={isFirstTimeLoginModalOpen}
        onClose={() => setIsFirstTimeLoginModalOpen(false)}
      >
        <DialogTitle>ようこそ！初回設定</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography>
              Conovelへようこそ！より良い体験のために、いくつかの設定をお願いします。
            </Typography>

            <TextField
              label='ユーザー名'
              variant='outlined'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              helperText='あなたの活動に表示される名前です'
            />

            <Typography variant='body2' color='text.secondary'>
              この設定はあとからいつでも変更できます。
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipOnboarding}>スキップ</Button>
          <Button
            onClick={handleCompleteOnboarding}
            variant='contained'
            disabled={!username.trim()}
          >
            設定を完了
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  );
};
