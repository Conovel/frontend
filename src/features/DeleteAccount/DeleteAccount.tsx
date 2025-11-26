import { Box, Typography, Button, Modal } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { UsersApi } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';
import { useAuth } from '../../providers/auth';

export const DeleteAccount = () => {
  const navigate = useNavigate();
  const { logout, setCurrentUser } = useAuth();
  const usersApi = useMemo(() => new UsersApi(axiosConfig), []);

  const [isOpenModal, setIsOpenModal] = useState(false); // モーダルの開閉状態を管理
  const [isChecked, setIsChecked] = useState(false); // チェックボックスの状態を管理
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!isChecked || isDeleting) return;
    setError(null);
    setIsDeleting(true);
    try {
      await usersApi.deleteUserByMe(async () => {
        await logout();
        navigate('/login');
      });
      await logout();
      setCurrentUser(null);
      navigate('/accountDeleted');
    } catch (err) {
      console.error('アカウント削除に失敗しました:', err);
      setError(
        'アカウント削除に失敗しました。時間をおいて再度お試しください。',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleGoBack = () => {
    navigate('/account');
  };

  const toggleModal = () => setIsOpenModal(!isOpenModal); // モーダルの開閉を切り替える

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      toggleModal();
    }
  }; // チェックボックスの状態を切り替える

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5vh',
      }}
    >
      <Typography variant='h4' sx={{ marginBottom: '2vh' }}>
        アカウントの削除
      </Typography>
      {error && (
        <Typography color='error' sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Typography variant='body1' sx={{ marginBottom: '2vh' }}>
        アカウントの削除を行った場合、
        <br />
        以下のことに同意いただきます。
      </Typography>
      <Box
        sx={{
          border: '1px solid black',
          padding: '2vh 0',
          margin: '2vh 0',
          borderRadius: '4px',
          width: '80%',
          height: '15vh',
          maxWidth: '600px',
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginTop='2vh'
        >
          <Typography
            variant='h6'
            component='a'
            onClick={toggleModal}
            sx={{ textDecoration: 'underline' }}
          >
            利用規約を確認
          </Typography>
          <LaunchIcon />
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginTop='4vh'
          sx={{ cursor: 'pointer' }}
        >
          {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          <Typography variant='h6'>同意します</Typography>
        </Box>
      </Box>
      {/* モーダルの追加 */}
      <Modal open={isOpenModal} onClose={toggleModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '2vh',
            width: '80%',
            height: '80%',
            maxWidth: '600px',
          }}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h5' sx={{ margin: '2vh' }}>
              利用規約
            </Typography>
            <CloseIcon
              onClick={toggleModal}
              sx={{ cursor: 'pointer', margin: '2vh' }}
            />
          </Box>

          <Box flex={1}>
            <iframe
              src='/terms.pdf#toolbar=0&navpanes=0&view=FitH'
              width='100%'
              height='100%'
              style={{ border: 'none' }}
            />
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            marginBottom='2vh'
            onClick={handleToggleCheckbox}
            sx={{ cursor: 'pointer' }}
          >
            {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            <Typography variant='h6'>同意します</Typography>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{
          padding: '2vh 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          width: '80%',
          maxWidth: '600px',
          position: 'absolute',
          bottom: '20vh',
        }}
      >
        <Button
          size='large'
          variant='contained'
          onClick={handleDeleteAccount}
          disabled={!isChecked || isDeleting} // チェックボックスがチェックされていないときは非活性
          sx={{
            backgroundColor: '#F24726',
            '&:hover': {
              backgroundColor: '#F24726',
            },
            color: 'white',
            width: '100%',
          }} // 赤色塗りつぶし
        >
          {isDeleting ? '削除中…' : 'アカウント削除'}
        </Button>
        <Button
          size='large'
          variant='outlined'
          onClick={handleGoBack}
          sx={{ color: 'black', borderColor: 'black', width: '100%' }} // 白抜きボタン
        >
          削除せず戻る
        </Button>
      </Box>
    </Box>
  );
};
