import usersSlice from './index';
import { AppDispatch } from '../..';
import UsersService from '../../../api/UsersService';
import { User } from '../../../models/baseTypes';
import { call, put, takeEvery } from 'redux-saga/effects';

const { setError, setLoading, setUsers, changeUser, deleteUser, setUser } = usersSlice.actions;

export function* watchFetchUsers() {
  yield takeEvery('getUsers', fetchUsers);
}

function* fetchUsers() {
  try {
    yield put(setLoading(true));
    const { status, data } = yield call(UsersService.fetchUsers);
    if (status) {
      yield put(setUsers(data));
    }
  } catch (e) {
    yield put(setError(JSON.stringify(e)));
  } finally {
    yield put(setLoading(false));
  }
}

const us = {
  fetchUsers: () => async (dispatch: AppDispatch) => {
    dispatch({ type: 'getUsers' });
  },

  originalFetchUsers: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { status, data } = await UsersService.fetchUsers();

      if (status) {
        dispatch(setUsers(data));
      }
    } catch (e) {
      dispatch(setError(JSON.stringify(e)));
    } finally {
      dispatch(setLoading(false));
    }
  },
  createUser: (user: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { status, data } = await UsersService.postUser(user);

      if (status) {
        dispatch(setUser(data));
      }
    } catch (e) {
      dispatch(setError(JSON.stringify(e)));
    } finally {
      dispatch(setLoading(false));
    }
  },
  changeUser: (user: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { status, data } = await UsersService.putUser(user);

      if (status) {
        dispatch(changeUser(data));
      }
    } catch (e) {
      dispatch(setError(JSON.stringify(e)));
    } finally {
      dispatch(setLoading(false));
    }
  },
  deleteUser: (user: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { status } = await UsersService.delUser(user);

      if (status) {
        dispatch(deleteUser(user));
      }
    } catch (e) {
      dispatch(setError(JSON.stringify(e)));
    } finally {
      dispatch(setLoading(false));
    }
  },
};

export default us;
