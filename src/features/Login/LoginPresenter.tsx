import { Box, Typography, Container, Button, Divider, Snackbar, Alert } from '@mui/material';
import GoogleSignInButton from '../../components/buttonicon/GoogleSignInButton';
import { useAuth } from '../../providers/auth';
import { Link as RouterLink, useLocation, useNavigate  } from 'react-router';
import React, { useEffect, useState, useCallback } from 'react'

export const LoginPresenter = () => {
  const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL;
  const { currentUser, logout } = useAuth();

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${authBaseUrl}/auth/google_oauth2`;
  };
  const location = useLocation()
  const navigate = useNavigate()

  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastSeverity, setToastSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('info') // MUIのAlertの種類

  const handleToastClose = useCallback((_event?: unknown, reason?: string) => {
    if (reason === 'clickaway') return
    setToastOpen(false)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const msg = params.get('message')
    const level = params.get('messageLevel')

    if (msg) {
      // デコード（Rails 側で自動エンコードされている想定）
      const decoded = decodeURIComponent(msg)
      setToastMessage(decoded)

      switch ((level || '').toLowerCase()) {
        case 'error':
          setToastSeverity('error')
          break
        case 'warning':
          setToastSeverity('warning')
          break
        case 'success':
          setToastSeverity('success')
          break
        default:
          setToastSeverity('info')
      }

      setToastOpen(true)

      // クエリを消してリロード時に再表示されないようにする
      // react-router の navigate がある場合は replace、なければ history API を使う
      try {
        navigate(location.pathname + location.hash, { replace: true })
      } catch {
        window.history.replaceState({}, document.title, location.pathname + location.hash)
      }
    }
  // location.search が変わったら再評価
  }, [location.search, location.pathname, location.hash, navigate])

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
                sx={{ borderColor: 'black', color: 'black', padding: '4px 16px' }}
              >
                ログアウト
              </Button>

              <Divider sx={{ width: '100%', my: 2 }}>または</Divider>

              <Button
                component={RouterLink}
                variant='outlined'
                to='/account'
                sx={{ borderColor: 'black', color: 'black', padding: '4px 16px' }}
              >
                アカウント情報へ
              </Button>
            </>
          ) : (
            <>
              <p>ログインまたは新規登録してください</p>
              <GoogleSignInButton onClick={handleGoogleAuth} className="" />
            </>
          )}
          <Snackbar
            open={toastOpen}
            autoHideDuration={5000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{
              mb: 12, // 下の余白
              zIndex: (theme) => theme.zIndex.snackbar + 1000, // 前面に出す
            }}
          >
            <Alert
              onClose={handleToastClose}
              severity={toastSeverity}
              sx={(theme) => ({
                width: '100%',
                boxShadow: theme.shadows[6],
              })}>
              {toastMessage}
            </Alert>
          </Snackbar>
        </>
      </Box>
    </Container>
  );
};
