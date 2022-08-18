import usersSlice from './index';
import { AppDispatch } from '../..';
import UsersService from '../../../api/UsersService';
import { User } from '../../../models/baseTypes';

const { setError, setLoading, setUsers, changeUser, deleteUser, setUser } = usersSlice.actions;

const us = {
  fetchUsers: () => async (dispatch: AppDispatch) => {
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
