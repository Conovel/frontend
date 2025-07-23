import { Box, Typography, Container, Button, Divider } from '@mui/material';
import { useAuth } from '../../providers/auth';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { useLastVisitedPage } from '../../hooks/useLastVisitedPage';
import { GoogleLogo } from '../../components/icons/GoogleLogo';

export const LoginPresenter = () => {
  const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL;
  const { currentUser, logout } = useAuth();
  const { navigateToLastVisitedPage } = useLastVisitedPage();

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${authBaseUrl}/auth/google_oauth2`;
  };

  // ログイン済みの場合、前回のページに自動遷移
  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        navigateToLastVisitedPage();
      }, 2000); // 2秒後に自動遷移

      return () => clearTimeout(timer);
    }
  }, [currentUser, navigateToLastVisitedPage]);

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant='h4' component='h1'>
          ログイン
        </Typography>
        <>
          {currentUser ? (
            <>
              <img
                src={currentUser.profileIconImage}
                alt='プロフィールアイコン'
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
              <p>
                ようこそ、{currentUser.userName}さん！
                <br />
                （ユーザーID：{currentUser.userId}）
              </p>
              <Typography
                variant='body2'
                color='primary'
                sx={{ fontWeight: 'bold' }}
              >
                2秒後に前回のページに自動で戻ります...
              </Typography>
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
            <>
              <p>ログインまたは新規登録してください</p>
              <Button
                variant='contained'
                onClick={handleGoogleAuth}
                startIcon={<GoogleLogo size={18} />}
                sx={{
                  width: '240px',
                  backgroundColor: '#ffffff',
                  color: '#1f1f1f',
                  border: '1px solid #747775',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12)',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
                  },
                  '&:focus': {
                    backgroundColor: '#f8f9fa',
                  },
                  '&:active': {
                    backgroundColor: '#e8eaed',
                  },
                }}
              >
                Googleでログイン
              </Button>
            </>
          )}
        </>
      </Box>
    </Container>
  );
};
