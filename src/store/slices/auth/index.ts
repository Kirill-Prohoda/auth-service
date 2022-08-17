import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models/baseTypes';

export enum AuthStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  EmptyStatus = '',
}

export interface AuthState {
  user: User;
  authStatus: AuthStatus;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {} as User,
  authStatus: AuthStatus.EmptyStatus,
  error: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => ({
      ...state,
      user: payload,
    }),
    removeUser: state => ({
      ...state,
      user: {} as User,
    }),
    setAuthStatus: (state, { payload }: PayloadAction<AuthStatus>) => ({
      ...state,
      authStatus: payload,
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

export default userSlice;
