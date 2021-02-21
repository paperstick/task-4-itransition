import React from "react";
import { Route, Redirect } from "react-router-dom";

function LoginRoute ({ component: Component, handleSuccessfulAuth, handleLogin, loggedInStatus, user, ...rest }) {
  return (
    <Route {...rest}
      render={props => {
        if (loggedInStatus === "NOT_LOGGED_IN") {
          return <Component handleSuccessfulAuth = {handleSuccessfulAuth} 
          	handleLogout = {handleLogin} 
          	loggedInStatus={loggedInStatus}
          	user={user} {...props} />;
        } else {
          return (
            <Redirect to="/users" />
          );
        }
      }}
    />
  );
};

export default LoginRoute;
