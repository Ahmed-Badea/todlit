import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { checkAuthState } from '../utils/auth/checkAuthState';
import { OUTER_ROUTES, outerLayoutRoutes } from './outer-routes';
import { INNER_ROUTES, innerLayoutRoutes } from './inner-routes';
import { subRoutes } from './sub-routes';

export const Router = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthState());

  useEffect(() => {
    const authState = checkAuthState();
    setIsAuthenticated(authState);
  }, [location]);

  return (
    <Routes>
      {outerLayoutRoutes.map((route) => (
        <Route
          path={route.path}
          element={isAuthenticated ? <Navigate to={INNER_ROUTES.DASHBOARD} /> : route.element}
          key={route.name}
        />
      ))}
      {innerLayoutRoutes.map((route) => (
        <Route
          path={route.path}
          element={isAuthenticated ? route.element : <Navigate to={OUTER_ROUTES.LOGIN} />}
          key={route.name}
        />
      ))}
      {subRoutes.map(({ path, element, isProtected }) => (
        <Route
          key={path}
          path={path}
          element={isAuthenticated || !isProtected ? element : <Navigate to={OUTER_ROUTES.LOGIN} />}
        />
      ))}
      <Route path="*" element={isAuthenticated ? <Navigate to={INNER_ROUTES.DASHBOARD} /> : <Navigate to={OUTER_ROUTES.LOGIN} />} key="*" />
    </Routes>
  );
};
