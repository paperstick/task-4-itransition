import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute ({ component: Component, handleLogout, loggedInStatus, user, ...rest }) {
  return (
    <Route {...rest}
      render={props => {
        if (loggedInStatus === "LOGGED_IN") {
          return <Component handleLogout = {handleLogout} 
          loggedInStatus={loggedInStatus}
          user={user} 
          {...props} />;
        } else {
          return (
            <Redirect to="/login" />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
