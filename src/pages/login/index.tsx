import {
  Box,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isFirstTimeLoginModalOpen, setIsFirstTimeLoginModalOpen] =
    useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // デモ用の簡易的な実装
  const handleGoogleSuccess = (credentialResponse: any) => {
    // 実際の認証処理はコメントアウト
    // const { credential } = credentialResponse;
    // TODO: バックエンドAPIとの連携
    console.log('ログイン成功（デモ）:', credentialResponse);

    // 通常のログイン後の処理
    // 初回ログインの場合はモーダルを表示する
    setIsFirstTimeLoginModalOpen(true);

    // ログイン成功後にホームページに遷移
    navigate('/');
  };

  const handleGoogleError = () => {
    setLoginError('ログインに失敗しました。もう一度お試しください。');
  };

  const handleCompleteOnboarding = () => {
    // ユーザー名など初回設定情報を保存する処理をここに追加
    console.log('初回設定が完了しました。ユーザー名:', username);
    setIsFirstTimeLoginModalOpen(false);

    // ログイン完了後にホームページなどに遷移
    navigate('/');
  };

  const handleSkipOnboarding = () => {
    setIsFirstTimeLoginModalOpen(false);
    navigate('/');
  };

  const openFirstTimeLoginModal = () => {
    setIsFirstTimeLoginModalOpen(true);
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

        <Divider sx={{ width: '100%', my: 2 }}>または</Divider>

        <Button
          variant='outlined'
          color='primary'
          onClick={openFirstTimeLoginModal}
          sx={{ width: '240px' }}
        >
          初回ログイン
        </Button>

        {loginError && <Typography color='error'>{loginError}</Typography>}
      </Box>

      {/* 初回ログイン用モーダル */}
      <Dialog
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
      </Dialog>
    </Container>
  );
};

export default Login;
