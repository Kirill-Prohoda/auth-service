import { AppDispatch } from '../..';
import AuthService from '../../../api/AuthService';
import auth, { AuthStatus } from './index';
import { Constants } from './../../../models/constant';
import LocalStorage from '../../../api/LocalStorage';

const { setUser, removeUser, setAuthStatus, setLoading, setError } = auth.actions;

const au = {
  checkUser: () => async (dispatch: AppDispatch) => {
    const token: string = LocalStorage.getToken();

    if (token) {
      const { login, pass } = JSON.parse(token);
      try {
        dispatch(setLoading(true));
        const { status, data } = await AuthService.doLogin(login, pass);
        if (status === 200) {
          dispatch(setUser(data));
          dispatch(setAuthStatus(AuthStatus.Auth));
          dispatch(setError(''));
        }
        if (status === 501) {
          dispatch(setError(JSON.stringify(Constants.NotAuth)));
          dispatch(setAuthStatus(AuthStatus.NoAuth));
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
      if (status === 200) {
        LocalStorage.setToken(JSON.stringify({ login, pass }));
        dispatch(setUser(data));
        dispatch(setAuthStatus(AuthStatus.Auth));
        dispatch(setError(''));
      }
      if (status === 501) {
        dispatch(setError(Constants.NotAuth));
        dispatch(setAuthStatus(AuthStatus.NoAuth));
      }
    } catch (e) {
      dispatch(setError(JSON.stringify(e)));
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    } finally {
      dispatch(setLoading(false));
    }
  },
  doLogout: () => async (dispatch: AppDispatch) => {
    LocalStorage.removeToken();
    dispatch(removeUser());
    dispatch(setAuthStatus(AuthStatus.NoAuth));
  },
};

export default au;
