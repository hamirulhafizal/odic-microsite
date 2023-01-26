import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

// project imports
import Logo from '../Logo';

// assets
import { IconLogin, IconLogout } from '@tabler/icons';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSection from 'layout/MainLayout/LogoSection';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';

function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window
  });
  const darkBorder = theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200];

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
    style: {
      // backgroundColor: theme.palette.background.default,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      // borderBottom: trigger ? 'none' : '1px solid',
      borderColor: trigger ? '' : darkBorder,
      color: theme.palette.text.dark
    }
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.node,
  window: PropTypes.object
};

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  const [drawerToggle, setDrawerToggle] = React.useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleListing = () => {
    router.push('/listing');
  };

  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container>
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
              <LogoSection />
            </Typography>
            <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={2}>
              <Button
                sx={{ color: 'white' }}
                variant="contained"
                color="secondary"
                endIcon={user ? <LogoutIcon /> : <LoginIcon />}
                component={Link}
                onClick={user ? handleLogout : handleLogin}
              >
                {user ? 'LOGOUT' : 'LOGIN'}
              </Button>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton sx={{ ml: 1 }} color="secondary" onClick={drawerToggler(true)} size="large">
                <MenuIcon />
              </IconButton>

              <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                {drawerToggle && (
                  <Box sx={{ width: 'auto' }} role="presentation" onClick={drawerToggler(false)} onKeyDown={drawerToggler(false)}>
                    <List>
                      <Link style={{ textDecoration: 'none', display: `${!user && 'none'}` }}>
                        <ListItemButton component="a" onClick={user ? handleListing : ''}>
                          <ListItemIcon>{user ? <GridViewOutlinedIcon /> : ''}</ListItemIcon>
                          <ListItemText primary={user ? 'Listing' : ''} />
                        </ListItemButton>
                      </Link>

                      <Link style={{ textDecoration: 'none' }}>
                        <ListItemButton component="a" onClick={user ? handleLogout : handleLogin}>
                          <ListItemIcon>{user ? <IconLogout /> : <IconLogin />}</ListItemIcon>
                          <ListItemText primary={user ? 'Logout' : 'Login'} />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
