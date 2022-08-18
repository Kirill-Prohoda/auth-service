import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models/baseTypes';

export interface UsersState {
  users: User[];
  error: string;
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [] as User[],
  error: '',
  isLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => ({
      ...state,
      users: payload,
    }),
    setUser: (state, { payload }: PayloadAction<User>) => ({
      ...state,
      users: [...state.users, payload],
    }),
    changeUser: (state, { payload }: PayloadAction<User>) => ({
      ...state,
      users: state.users.map(user => (user.id === payload.id ? payload : user)),
    }),
    deleteUser: (state, { payload }: PayloadAction<User>) => ({
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
