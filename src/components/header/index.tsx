import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';

import logo from './image/conovel_header_logo.webp';
import { MenuButton } from '../sidebar';

function ResponsiveAppBar() {
  const [, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = ['Profile', 'Account', 'Dashboard', 'Logout']; // ここで直接定義

  return (
    <AppBar position='fixed' color='default'>
      <Container maxWidth='xl' sx={{ px: { xs: 0, md: 3 } }}>
        {' '}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Toolbar>
            {' '}
            {/* メニュー */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <MenuButton
                pages={['Home', 'Account', 'Administer', 'Policy', 'logout']}
              />
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
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
                src='../image/conovel_header_logo.webp'
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
            {/* アイコン */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              ></Menu>
            </Box>
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
