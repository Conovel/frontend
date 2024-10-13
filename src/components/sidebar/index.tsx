import * as React from 'react';
import { useState } from 'react';

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

const ListComponent: React.FC<{
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = ({ selectedIndex, onSelect }) => (
  <Box sx={{ width: 80 }} role='presentation'>
    <List sx={{ pt: 8 }}>
      {MenuButtonItems.map(({ name, icon }, index) => (
        <ListItem key={name} disablePadding>
          <ListItemButton
            onClick={() => onSelect(index)}
            sx={{
              position: 'relative',
              backgroundColor:
                selectedIndex === index ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Box sx={{ fontSize: 20 }}>{icon}</Box>
              <Typography
                variant='caption'
                sx={{ textAlign: 'center', fontSize: 8, fontWeight: 'bold' }}
              >
                {name}
              </Typography>
            </Box>
            {selectedIndex === index && (
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 8,
                  backgroundColor: '#467DCC',
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(isOpen);
    };

  const handleMenuButtonClick = () => {
    setIsOpen((prev) => !prev);
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
      <Drawer anchor='left' open={isOpen} onClose={toggleDrawer(false)}>
        <ListComponent
          selectedIndex={selectedIndex ?? 0}
          onSelect={setSelectedIndex}
        />
      </Drawer>
    </>
  );
};
