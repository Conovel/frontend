import { Box, Typography, Button, Modal } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export const DeleteAccount = () => {
  const [openModal, setOpenModal] = useState(false); // モーダルの開閉状態を管理
  const [isChecked, setIsChecked] = useState(false); // チェックボックスの状態を管理

  const handleDeleteAccount = () => {
    // アカウント削除処理をここに追加
  };

  const handleGoBack = () => {
    // 戻る処理をここに追加
  };

  const handleOpenModal = () => setOpenModal(true); // モーダルを開く
  const handleCloseModal = () => setOpenModal(false); // モーダルを閉じる
  const handleToggleCheckbox = () => setIsChecked(!isChecked); // チェックボックスの状態を切り替える

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
            onClick={handleOpenModal}
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
          onClick={handleToggleCheckbox}
          sx={{ cursor: 'pointer' }}
        >
          {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          <Typography variant='h6'>同意します</Typography>
        </Box>
      </Box>
      {/* モーダルの追加 */}
      <Modal open={openModal} onClose={handleCloseModal}>
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
              onClick={handleCloseModal}
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
          sx={{ backgroundColor: '#F24726', color: 'white', width: '100%' }} // 赤色塗りつぶし
          disabled={!isChecked} // チェックボックスがチェックされていないときは非活性
        >
          アカウント削除
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
