import usersSlice from "./index";
import { AppDispatch } from "../..";

const { changeUser, deleteUser, setError, setLoading, setUsers } =
  usersSlice.actions;

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
