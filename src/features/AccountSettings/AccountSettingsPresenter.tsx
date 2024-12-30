import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { InfoOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

export const AccountSettingsPresenter = () => {
  return (
    <>
      <Typography variant='h4'>アカウント情報</Typography>

      {/** アカウント情報 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/** アバター */}
        <Box sx={{ margin: '0 auto' }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ bgcolor: 'magenta' }}>HN</Avatar>
            <IconButton
              sx={{
                padding: 0,
                width: 'fit-content',
                position: 'absolute',
                bottom: -4,
                right: -8,
              }}
            >
              <EditIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>ペンネーム</Typography>
            <Tooltip title='ペンネーム'>
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>花子</Typography>
            <IconButton sx={{ padding: 0, width: 'fit-content' }}>
              <EditIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>ニックネーム</Typography>
            <Tooltip title='ニックネーム'>
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>HANA</Typography>
            <IconButton sx={{ padding: 0, width: 'fit-content' }}>
              <EditIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>生年月</Typography>
            <Tooltip title='生年月'>
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography>1998/2</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>匿名設定</Typography>
            <Tooltip title='匿名設定'>
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </Box>

          <Switch />
        </Box>
      </Box>

      {/** アカウント削除ボタン */}

      {/** 投稿小説 */}

      {/** 読者登録小説（閲覧小説とかの表現の方がベターかも） */}
    </>
  );
};
