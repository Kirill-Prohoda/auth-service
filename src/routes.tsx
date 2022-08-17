import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Users from './pages/users/Users';

interface ICustomRoutes {
  isAuth: boolean;
}

interface IPrivate {
  isAuth: boolean;
  component: FC;
}

const Private = ({ isAuth, component: Component, ...props }: IPrivate) => {
  return <>{isAuth ? <Component {...props} /> : <Navigate replace to={'/login'} />}</>;
};

const CustomRoutes: FC<ICustomRoutes> = ({ isAuth }) => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Private component={Main} isAuth={isAuth} />} />
        <Route path={'/users'} element={<Private component={Users} isAuth={isAuth} />} />
        <Route path={'login'} element={<Login />} />
      </Routes>
    </>
  );
};
export default CustomRoutes;
