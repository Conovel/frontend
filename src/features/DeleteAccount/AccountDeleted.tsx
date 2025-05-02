import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography } from '@mui/material';

export const AccountDeleted = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Typography variant='h5' sx={{ marginBottom: '2vh' }}>
        アカウントが削除されました
      </Typography>
      <Typography variant='body1'>
        {countdown}秒後にホーム画面に遷移します。
      </Typography>
    </Box>
  );
};
