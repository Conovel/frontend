import { Box, Typography, Container, Button, Divider } from '@mui/material';
import GoogleSignInButton from '../../components/buttonicon/GoogleSignInButton';
import { useAuth } from '../../providers/auth';
import { Link as RouterLink } from 'react-router';
import React from 'react';
import ToastSnackbar from '../../components/toastSnackbar';

export const LoginPresenter = () => {
  const authBaseUrl =
    import.meta.env.VITE_AUTH_BASE_URL || import.meta.env.VITE_API_BASE_URL;
  const { currentUser, logout } = useAuth();

  const buildGoogleAuthUrl = () => {
    if (!authBaseUrl || authBaseUrl === 'dummy') {
      console.error(
        'VITE_AUTH_BASE_URL is not configured. Set it to the backend origin hosting /auth/google_oauth2.',
      );
      return null;
    }

    if (!/^https?:\/\//i.test(authBaseUrl)) {
      console.error(
        `VITE_AUTH_BASE_URL must be an absolute URL (got "${authBaseUrl}").`,
      );
      return null;
    }

    const normalizedBase = authBaseUrl.replace(/\/+$/, '');
    return `${normalizedBase}/auth/google_oauth2`;
  };

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const googleAuthUrl = buildGoogleAuthUrl();
    if (!googleAuthUrl) return;

    window.location.href = googleAuthUrl;
  };

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
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
                style={{ width: '90px', height: '90px', borderRadius: '50%' }}
              />
              <p>
                {currentUser.penName} さん
                <br />
                （ユーザーID：{currentUser.userId}）
              </p>
              <Button
                onClick={logout}
                variant='outlined'
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  padding: '4px 16px',
                }}
              >
                ログアウト
              </Button>

              <Divider sx={{ width: '100%', my: 2 }}>または</Divider>

              <Button
                component={RouterLink}
                variant='outlined'
                to='/account'
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  padding: '4px 16px',
                }}
              >
                アカウント情報へ
              </Button>
            </>
          ) : (
            <>
              <p>ログインまたは新規登録してください</p>
              <GoogleSignInButton onClick={handleGoogleAuth} className='' />
            </>
          )}
          <ToastSnackbar />
        </>
      </Box>
    </Container>
  );
};
