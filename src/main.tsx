import React, { useEffect } from "react";
import { useActions } from "./hooks/useActions";
import { useSelector } from "react-redux";
import CustomRoutes from "./routes";
import { RootState } from "./store";
import { AuthStatus } from "./store/slices/auth";

const Main = () => {
  const { checkUser } = useActions();
  const { authStatus } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    checkUser();
  }, []);

  if (authStatus === AuthStatus.EmptyStatus) return <div>loading</div>;
  return <CustomRoutes isAuth={authStatus === AuthStatus.Auth} />;
};
export default Main;
