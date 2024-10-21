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
import { Link } from 'react-router-dom';

const MenuButtonItems = [
  { name: 'ホーム', icon: <HomeIcon />, link: '/' },
  { name: 'アカウント', icon: <PersonIcon />, link: '/account' },
  { name: '運営会社', icon: <BusinessIcon />, link: '/company' },
  { name: 'ポリシー', icon: <BalanceIcon />, link: '/terms' },
  { name: 'ログアウト', icon: <LogoutIcon />, link: '/' },
];

const ListComponent: React.FC<{
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = ({ selectedIndex, onSelect }) => (
  <Box sx={{ width: 80 }} role='presentation'>
    <List sx={{ pt: 8 }}>
      {MenuButtonItems.map(({ name, icon, link }, index) => (
        <ListItem key={name} disablePadding>
          <Link
            to={link}
            style={{ color: 'inherit', width: '100%', textDecoration: 'none' }}
          >
            <ListItemButton
              onClick={() => onSelect(index)}
              sx={{
                position: 'relative',
                backgroundColor:
                  selectedIndex === index
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'transparent',
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
                  sx={{
                    textAlign: 'center',
                    fontSize: 8,
                    fontWeight: 'bold',
                  }}
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
          </Link>
        </ListItem>
      ))}
    </List>
  </Box>
);

export const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(!isOpen);
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
