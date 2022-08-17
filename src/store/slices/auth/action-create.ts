import { AppDispatch } from '../..';
import auth, { AuthStatus, User } from './index';

const { setUser, removeUser, setAuthStatus, setLoading, setError } = auth.actions;

const user: User = {
  id: '1001',
  name: 'Kirill',
};
const au = {
  checkUser: () => async (dispatch: AppDispatch) => {
    const token: string = localStorage.getItem('token') ?? '';

    if (token) {
      try {
        dispatch(setLoading(true));
        const { status, data } = { status: true, data: user };
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
      const { status, data } = { status: true, data: user };
      if (status) {
        localStorage.setItem('token', `${login} ${pass}`);
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
  },
};

export default au;
