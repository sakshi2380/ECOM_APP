
import {  Outlet, Navigate } from "react-router-dom";
import { isAutheticated } from "./index.js";
import React, { Fragment } from "react";
const AdminRoute = ({ element: Element, ...rest }) => {
  return (
    <Outlet
      {...rest}
      render={props =>
        isAutheticated() && isAutheticated().user.role == "admin" ? (
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

export default AdminRoute;
