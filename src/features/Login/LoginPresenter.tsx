import {
  Box,
  Typography,
  Container,
  Button,
  Divider,
} from '@mui/material';
import { useAuth } from '../../providers/auth';
import { Link } from 'react-router';

export const LoginPresenter = () => {
  const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL;
  const { currentUserId, logout } = useAuth();

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
          gap: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          ログイン
        </Typography>
        <>
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
      </Box>
    </Container>
  );
};
