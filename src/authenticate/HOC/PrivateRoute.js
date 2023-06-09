import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Navigate to={`/signin`} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
