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

interface MenuButtonProps {
  pages: ('Home' | 'Account' | 'Administer' | 'Policy' | 'logout')[];
}

export const MenuButton: React.FC<MenuButtonProps> = ({ pages }) => {
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

  const icons = {
    Home: <HomeIcon />,
    Account: <PersonIcon />,
    Administer: <BusinessIcon />,
    Policy: <BalanceIcon />,
    logout: <LogoutIcon />,
  };

  const list = () => (
    <Box
      sx={{ width: 80 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ pt: 16 }}>
        {pages.map((page) => (
          <ListItem key={page} disablePadding>
            <ListItemButton>
              {React.cloneElement(icons[page], {
                sx: { fontSize: 50 },
                alt: `${page}`,
              })}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={toggleDrawer(true)}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};
