import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Outlet,
  Navigate,
  useLocation,
  Navigation,
} from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <Fragment>
      {loading === false && (
        <Outlet
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return (
                <Navigate to="/login" state={{ form: location }} replace />
              );
            }

            if (isAdmin === true && user.role !== "admin") {
              return (
                <Navigate to="/login" state={{ form: location }} replace />
              );
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
