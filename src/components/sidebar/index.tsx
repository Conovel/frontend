import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoginIcon from '@mui/icons-material/Login';

const getMenuItems = (isLoggedIn: boolean, handleLogout: () => void) => [
  { name: 'ホーム', icon: <HomeIcon />, link: '/' },
  { name: '運営会社', icon: <BusinessIcon />, link: '/company' },
  { name: 'ポリシー', icon: <BalanceIcon />, link: '/terms' },
  ...(isLoggedIn
    ? [
        { name: 'アカウント', icon: <PersonIcon />, link: '/account' },
        {
          name: 'ログアウト',
          icon: <LogoutIcon />,
          onClick: handleLogout,
          link: null,
        },
      ]
    : []),
];

const ListComponent: React.FC<{
  selectedIndex: number;
  onSelect: (index: number) => void;
  isLoggedIn: boolean;
  handleLogout: () => void;
  handleLogin: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedIndex, onSelect, isLoggedIn, handleLogout, setIsLoggedIn }) => {
  const menuItems = getMenuItems(isLoggedIn, handleLogout);
  const [openDialog, setOpenDialog] = useState(false);

  const handleGoogleLoginClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={{ width: 80 }} role='presentation'>
        <List sx={{ pt: 8 }}>
          {menuItems.map(({ name, icon, link, onClick }, index) => (
            <ListItem key={name} disablePadding>
              {link !== null ? (
                <Link
                  to={link}
                  style={{
                    color: 'inherit',
                    width: '100%',
                    textDecoration: 'none',
                  }}
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
              ) : (
                <ListItemButton
                  onClick={() => {
                    onSelect(index);
                    if (onClick) onClick();
                  }}
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
              )}
            </ListItem>
          ))}

          {!isLoggedIn && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleGoogleLoginClick}
                  sx={{
                    position: 'relative',
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
                    <Box sx={{ fontSize: 20 }}>
                      <GoogleIcon />
                    </Box>
                    <Typography
                      variant='caption'
                      sx={{
                        textAlign: 'center',
                        fontSize: 8,
                        fontWeight: 'bold',
                      }}
                    >
                      Googleログイン
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='google-login-dialog'
      >
        <DialogTitle>Googleアカウントでログイン</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant='contained'
              startIcon={<GoogleIcon />}
              onClick={() => {
                setIsLoggedIn(true);
                handleCloseDialog();
              }}
              sx={{
                backgroundColor: '#fff',
                color: '#757575',
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
                px: 4,
                py: 1,
              }}
            >
              Googleでログイン
            </Button>
            <Button
              variant='contained'
              startIcon={<LoginIcon />}
              onClick={() => {
                setIsLoggedIn(true);
                handleCloseDialog();
              }}
            >
              初回ログイン
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsOpen(false);
    navigate('/');
  };

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
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Drawer>
    </>
  );
};
