import { Box, Typography, Container, Button, Divider } from '@mui/material';
import GoogleSignInButton from '../../components/buttonicon/GoogleSignInButton';
import { useAuth } from '../../providers/auth';
import { Link } from 'react-router';

export const LoginPresenter = () => {
  const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL;
  const { currentUser, logout } = useAuth();

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${authBaseUrl}/auth/google_oauth2`;
  };

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
                ようこそ、{currentUser.penName}さん！
                <br />
                （ユーザーID：{currentUser.userId}）
              </p>
              <Button
                variant='outlined'
                color='primary'
                onClick={logout}
                sx={{ borderColor: 'black', color: 'black', width: '240px' }}
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
              <GoogleSignInButton onClick={handleGoogleAuth} className="" />
            </>
          )}
        </>
      </Box>
    </Container>
  );
};
