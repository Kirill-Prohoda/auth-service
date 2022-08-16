import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/auth";

import authAC from "./slices/auth/action-create";
import usersAC from "./slices/users/action-create";

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
    users: users.reducer,
  },
});

export const allActionCreators = {
  ...authAC,
  ...usersAC,
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
