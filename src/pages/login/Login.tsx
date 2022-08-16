import React from "react";
import { useActions } from "../../hooks/useActions";

const Login = () => {
  const { doLogin } = useActions();

  return (
    <div>
      login
      <button type="button" onClick={() => doLogin("admin", "admin")}>
        doLogin
      </button>
    </div>
  );
};

export default Login;
