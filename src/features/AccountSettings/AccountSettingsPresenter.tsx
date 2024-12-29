import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

export const AccountSettingsPresenter = () => {
  return (
    <>
      <Typography variant='h4'>アカウント情報</Typography>

      {/** アカウント情報 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/** アバター */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>ペンネーム</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>花子</Typography>
            <Button sx={{ padding: 0, width: 'fit-content' }}>
              <EditIcon sx={{ color: 'black' }} />
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>ニックネーム</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>HANA</Typography>
            <Button sx={{ padding: 0, width: 'fit-content' }}>
              <EditIcon sx={{ color: 'black' }} />
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>生年月</Typography>
          <Typography>1998/2</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>匿名設定</Typography>
          <Switch />
        </Box>
      </Box>

      {/** アカウント削除ボタン */}

      {/** 投稿小説 */}

      {/** 読者登録小説（閲覧小説とかの表現の方がベターかも） */}
    </>
  );
};
