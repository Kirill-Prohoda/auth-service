import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import auth from './slices/auth';
import users from './slices/users';

import authAC from './slices/auth/action-create';
import usersAC, { watchFetchUsers } from './slices/users/action-create';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
    users: users.reducer,
  },

  middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: true }), saga],
});

saga.run(rootSaga);

export default function* rootSaga() {
  yield all([watchFetchUsers()]);
}

export const allActionCreators = {
  ...authAC,
  ...usersAC,
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
