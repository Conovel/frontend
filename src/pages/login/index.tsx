import { Box, Typography, Container } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);

  // デモ用の簡易的な実装
  const handleGoogleSuccess = (credentialResponse: any) => {
    // 実際の認証処理はコメントアウト
    // const { credential } = credentialResponse;
    // TODO: バックエンドAPIとの連携
    console.log('ログイン成功（デモ）:', credentialResponse);
  };

  const handleGoogleError = () => {
    setLoginError('ログインに失敗しました。もう一度お試しください。');
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

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          // デモ用の設定
          text='signin_with'
          theme='outline'
        />

        {loginError && <Typography color='error'>{loginError}</Typography>}
      </Box>
    </Container>
  );
};

export default Login;
