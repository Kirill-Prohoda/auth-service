import { AppDispatch } from '../..';
import AuthService from '../../../api/AuthService';
import auth, { AuthStatus } from './index';

const { setUser, removeUser, setAuthStatus, setLoading, setError } = auth.actions;

const au = {
  checkUser: () => async (dispatch: AppDispatch) => {
    const token: string = localStorage.getItem('token') ?? '';

    if (token) {
      const { login, pass } = JSON.parse(token);
      try {
        dispatch(setLoading(true));
        const { status, data } = await AuthService.doLogin(login, pass);
        if (status) {
          dispatch(setUser(data));
          dispatch(setAuthStatus(AuthStatus.Auth));
        }
      } catch (e) {
        dispatch(setError(JSON.stringify(e)));
        dispatch(setAuthStatus(AuthStatus.NoAuth));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
  },
  doLogin: (login: string, pass: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { status, data } = await AuthService.doLogin(login, pass);
      if (status) {
        localStorage.setItem('token', JSON.stringify({ login, pass }));
        dispatch(setUser(data));
        dispatch(setAuthStatus(AuthStatus.Auth));
      }
    } catch (e) {
      dispatch(setError(JSON.stringify(e)));
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    } finally {
      dispatch(setLoading(false));
    }
  },
  doLogout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    dispatch(removeUser());
    dispatch(setAuthStatus(AuthStatus.NoAuth));
  },
};

export default au;
