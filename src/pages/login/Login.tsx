import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { Button, Typography, TextField, Box } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import st from './login.module.scss';
import { useTypedSelector } from '../../hooks/useTypeSelectors';
import { AuthStatus } from '../../store/slices/auth';
import { useNavigate } from 'react-router-dom';

enum Mode {
  Pass = 'pass',
  Login = 'login',
}

const Login = () => {
  const { authStatus } = useTypedSelector(state => state.auth);
  const theme = useTheme();
  const navigate = useNavigate();

  const { doLogin } = useActions();

  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      navigate('/');
    }
    if (authStatus === AuthStatus.NoAuth) {
      navigate('/login');
    }
  }, [authStatus]);

  const handleChange = (mode: Mode) => (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (mode) {
      case Mode.Pass: {
        setPass(e.target.value);
        break;
      }
      case Mode.Login: {
        setLogin(e.target.value);
        break;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doLogin(login, pass);
  };

  console.log(theme);
  return (
    <div className={st.container}>
      <div className={st.panel}>
        <Box component="form" onSubmit={handleSubmit} noValidate={false} sx={{ mt: 1 }}>
          <Typography
            component="h1"
            variant="h2"
            color="text.secondary"
            align="center"
            sx={{ m: 5 }}
          >
            Вход
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            value={login}
            onChange={handleChange(Mode.Login)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={pass}
            onChange={handleChange(Mode.Pass)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }}>
            Войти
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
