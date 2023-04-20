
import React, { Fragment } from "react";
import {  Outlet, Navigate } from "react-router-dom";
import { isAutheticated } from "./index";

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Outlet
      {...rest}
      render={props =>
        isAutheticated() ? (
          <Element {...props} />
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
