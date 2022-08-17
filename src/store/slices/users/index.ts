import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../auth';

type Users = User[];

export interface UsersState {
  users: Users;
  error: string;
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [] as Users,
  error: '',
  isLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    changeUser: (state, { payload }) => ({
      ...state,
      users: state.users.map(user => (user.id === payload.id ? payload : user)),
    }),
    deleteUser: (state, { payload }) => ({
      ...state,
      users: state.users.filter(user => user.id !== payload.id),
    }),
    setLoading: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      isLoading: payload,
    }),
    setError: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      error: payload,
    }),
  },
});

export default usersSlice;
