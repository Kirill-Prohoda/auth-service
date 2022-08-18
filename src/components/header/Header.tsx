import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import st from './header.module.scss';
import {
  IconButton,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Menu,
  Tooltip,
  Button,
} from '@mui/material';
import { ExitToApp, Cookie as Adb, Menu as MenuIcon } from '@mui/icons-material';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypeSelectors';

const Header: FC = () => {
  const { doLogout } = useActions();
  const navigate = useNavigate();
  const { user: root } = useTypedSelector(state => state.auth);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handlerClick = () => {
    doLogout();
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const listLink = [
    {
      path: '/',
      title: 'home',
    },
    {
      path: '/users',
      title: 'users',
    },
  ];

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Auth
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {listLink.map(page => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.path}
                    className={({ isActive }) => (isActive ? st.link__active : st.link)}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Adb sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Auth
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {listLink.map(page => (
              <Button
                key={page.title}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
            <Typography textAlign="center">{root.name}</Typography>
            <Tooltip title="Open settings">
              <IconButton aria-label="fingerprint" sx={{ color: 'white', fontSize: 50 }}>
                <ExitToApp sx={{ fontSize: 40 }} onClick={handlerClick} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
