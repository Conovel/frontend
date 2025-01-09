import { Box, Typography, Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const DeleteAccount = () => {
  const handleDeleteAccount = () => {
    // アカウント削除処理をここに追加
  };

  const handleGoBack = () => {
    // 戻る処理をここに追加
  };

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
          <Typography variant='h6'>利用規約を確認</Typography>
          <LaunchIcon />
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginTop='4vh'
        >
          <CheckBoxOutlineBlankIcon />
          <Typography variant='h6'>同意します</Typography>
        </Box>
      </Box>
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
