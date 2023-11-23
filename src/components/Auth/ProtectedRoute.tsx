import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import authService from "../../services/authService";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
}) => {
  const isAuthenticated = !!authService.getToken();

  return (
    <Route
      path={path}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/signin" replace={true} />
        )
      }
    />
  );
};

export default ProtectedRoute;
