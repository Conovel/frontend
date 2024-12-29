import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

export const AccountSettingsPresenter = () => {
  return (
    <>
      <Typography variant='h4'>アカウント情報</Typography>

      {/** アカウント情報 */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/** アバター */}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>ペンネーム</Typography>
          <Typography>花子</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>ニックネーム</Typography>
          <Typography>HANA</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>生年月</Typography>
          <Typography>1998/2</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
