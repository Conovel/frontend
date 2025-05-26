import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';

import logo from './image/conovel_header_logo.webp';
import { MenuButton } from '../sidebar';

function HeaderBar() {
  const navigate = useNavigate();

  return (
    <AppBar color='default' sx={{ top: 0, position: 'sticky', zIndex: 1201 }}>
      <Container maxWidth='xl' sx={{ px: { xs: 0, md: 3 } }}>
        <Box sx={{ justifyContent: 'center', width: '100%' }}>
          <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <MenuButton />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                height: '50px',
              }}
            >
              <Box
                onClick={() => navigate('/')}
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
                onClick={() => navigate('/')}
                component='img'
                src={logo}
                alt='Conovel Logo'
                sx={{
                  mr: 4,
                  display: { xs: 'flex', md: 'none' },
                  height: 40,
                }}
              />
            </Box>
            <Box sx={{ width: 48 }} /> {/* スペース確保用 */}
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
}

export default HeaderBar;
