import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';

import logo from './image/conovel_header_logo.webp';

function HeaderBar() {
  const [] = useState<HTMLElement | null>(null);

  return (
    <AppBar position='fixed' color='default' sx={{ zIndex: 1201 }}>
      <Container maxWidth='xl' sx={{ px: { xs: 0, md: 3 } }}>
        {' '}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Toolbar>
            {/* メニュー */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            ></Box>
            {/* ロゴ */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Box
                component='img'
                src={logo}
                alt='Conovel Logo'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  height: 40,
                  bgcolor: 'primary.main',
                  backgroundColor: 'ffffff',
                }}
              />
              <Box
                component='img'
                src={logo}
                alt='Conovel Logo'
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  height: 40,
                }}
              />
            </Box>
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
}

export default HeaderBar;
