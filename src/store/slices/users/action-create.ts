import usersSlice from './index';
import { AppDispatch } from '../..';

const { setError, setLoading, setUsers } = usersSlice.actions;

// changeUser, deleteUser,

const us = {
  fetchUsers: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { status, data } = await (() => ({
        status: true,
        data: [],
      }))();

      if (status) {
        dispatch(setUsers(data));
      }
    } catch (e) {
      dispatch(setError(JSON.stringify(e)));
    } finally {
      dispatch(setLoading(false));
    }
  },
};

export default us;
