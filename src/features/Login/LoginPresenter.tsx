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
// import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { useAuth } from "../../providers/auth";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPresenter = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isFirstTimeLoginModalOpen, setIsFirstTimeLoginModalOpen] =
    useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL;
  const { setToken, currentUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      localStorage.setItem("auth", token);
    }
  }, [setToken, navigate]);

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    const form = document.createElement("form");
    form.method = "GET";
    form.action = `${authBaseUrl}/auth/google_oauth2`;
    document.body.appendChild(form);
    form.submit();
  };

  // デモ用の簡易的な実装
  const handleGoogleSuccess = async (credentialResponse: any) => {
    const { credential } = credentialResponse;
    console.log('credential:', credentialResponse);

    try {
      const res = await axios.post(`${apiBaseUrl}/auth/create`, { token: credential });
      console.log('バックエンドからのレスポンス:', res.data);

      // 通常のログイン後の処理
      // 初回ログインの場合はモーダルを表示する
      setIsFirstTimeLoginModalOpen(true);

      // ログイン成功後にホームページに遷移
      navigate('/');
    } catch (error) {
      console.error('ログイン処理中にエラーが発生しました:', error);
      handleGoogleError();
    }
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

        {/* <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          // デモ用の設定
          text='signin_with'
          theme='outline'
        /> */}

        <>
          {/* ログイン済みの場合はマイページへのリンク、そうでない場合はログインボタン */}
          {currentUser ? (
              <Link to="/account" className="btn btn-accent gap-2 w-full">
                マイページへ
              </Link>
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
