import {
  Box,
  Typography,
  Container,
  Button,
  Modal,
  TextField,
  Divider,
  Avatar,
  IconButton,
  FormControlLabel,
  Switch,
  Paper,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useAuth, UserProfile } from '../../hooks/useAuth';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import ja from 'date-fns/locale/ja';

interface LoginPresenterProps {
  autoOpenFirstTimeLogin?: boolean;
}

export const LoginPresenter = ({
  autoOpenFirstTimeLogin = false,
}: LoginPresenterProps) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isFirstTimeLoginModalOpen, setIsFirstTimeLoginModalOpen] = useState(
    autoOpenFirstTimeLogin,
  );
  const [penName, setPenName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  // 日付を「yyyy年MM月」の形式でフォーマットする

  // autoOpenFirstTimeLoginが変更された場合にモーダル状態を更新
  useEffect(() => {
    if (autoOpenFirstTimeLogin) {
      setIsFirstTimeLoginModalOpen(true);
    }
  }, [autoOpenFirstTimeLogin]);

  // デモ用の簡易的な実装
  const handleGoogleSuccess = (credentialResponse: any) => {
    // 実際の認証処理はコメントアウト
    // const { credential } = credentialResponse;
    // TODO: バックエンドAPIとの連携
    console.log('ログイン成功（デモ）:', credentialResponse);

    // ログイン状態を設定
    login();

    // ログイン成功後にホームページに遷移
    navigate('/');
  };

  const handleGoogleError = () => {
    setLoginError('ログインに失敗しました。もう一度お試しください。');
  };

  const handleCompleteOnboarding = () => {
    // ユーザープロフィール情報を作成
    const userProfile: UserProfile = {
      username: penName,
      isAnonymous,
      avatarUrl: avatarUrl || undefined,
      birthYearAndMonth: birthDate || undefined,
    };

    // ログイン状態を設定し、プロフィール情報を保存
    login(userProfile);

    console.log('初回設定が完了しました', userProfile);
    setIsFirstTimeLoginModalOpen(false);

    // ログイン完了後にホームページなどに遷移
    navigate('/');
  };

  const openFirstTimeLoginModal = () => {
    setIsFirstTimeLoginModalOpen(true);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnonymousChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAnonymous(event.target.checked);
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
          containerProps={{
            style: {
              backgroundColor: 'black',
              color: 'white',
            },
          }}
        />

        <Divider sx={{ width: '100%', my: 2 }}>または</Divider>

        <Button
          variant='contained'
          color='inherit'
          onClick={openFirstTimeLoginModal}
          sx={{
            width: '240px',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333333',
            },
          }}
        >
          初回ログイン
        </Button>

        {loginError && <Typography color='error'>{loginError}</Typography>}
      </Box>

      {/* 初回ログイン用モーダル */}
      <Modal
        open={isFirstTimeLoginModalOpen}
        onClose={() => setIsFirstTimeLoginModalOpen(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mx: 4,
        }}
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 500,
            border: '1px solid #ccc',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
            ようこそ！初回設定
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography>
              Conovelへようこそ！
              <br />
              プロフィール情報を設定しましょう。
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar
                src={avatarUrl || undefined}
                sx={{ width: 100, height: 100 }}
              />
              <input
                accept='image/*'
                id='avatar-upload'
                type='file'
                hidden
                onChange={handleAvatarChange}
              />
              <label htmlFor='avatar-upload'>
                <IconButton
                  color='inherit'
                  aria-label='アップロード画像'
                  component='span'
                  sx={{ color: 'black' }}
                >
                  <AddPhotoAlternateIcon />
                </IconButton>
                <Typography variant='body2' component='span'>
                  プロフィール画像を選択
                </Typography>
              </label>
            </Box>

            <TextField
              label='ペンネーム'
              variant='outlined'
              fullWidth
              value={penName}
              onChange={(e) => setPenName(e.target.value)}
              helperText='あなたの活動に表示される名前です'
              required
            />

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ja}
            >
              <DatePicker
                label='生年月 *'
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                views={['year', 'month']}
                format='yyyy年MM月'
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    fullWidth: true,
                    helperText: 'プロフィールに表示されます（必須項目）',
                    required: true,
                  },
                }}
              />
            </LocalizationProvider>

            <FormControlLabel
              control={
                <Switch
                  checked={isAnonymous}
                  onChange={handleAnonymousChange}
                  color='primary'
                />
              }
              label='匿名で活動する'
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: 'black',
              mt: 4,
            }}
          >
            <Button
              onClick={() => setIsFirstTimeLoginModalOpen(false)}
              variant='outlined'
              sx={{
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                  borderColor: '#333333',
                },
              }}
            >
              戻る
            </Button>
            <Button
              onClick={handleCompleteOnboarding}
              variant='contained'
              disabled={!penName.trim() || birthDate === null}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              OK
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};
