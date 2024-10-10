import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import BalanceIcon from '@mui/icons-material/Balance';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';

const MenuButtonItems = [
  { name: 'ホーム', icon: <HomeIcon /> },
  { name: 'アカウント', icon: <PersonIcon /> },
  { name: '運営会社', icon: <BusinessIcon /> },
  { name: 'ポリシー', icon: <BalanceIcon /> },
  { name: 'ログアウト', icon: <LogoutIcon /> },
];

const ListComponent: React.FC = () => (
  <Box sx={{ width: 80 }} role='presentation'>
    <List sx={{ pt: 8 }}>
      {MenuButtonItems.map(({ name, icon }) => (
        <ListItem key={name} disablePadding>
          <ListItemButton>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {React.cloneElement(icon, {
                sx: { fontSize: 40 },
                alt: name,
              })}
              <Typography
                variant='caption'
                sx={{ textAlign: 'center', fontSize: 8, fontWeight: 'bold' }}
              >
                {name}
              </Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export const MenuButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  const handleMenuButtonClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenuButtonClick}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        <ListComponent />
      </Drawer>
    </>
  );
};
