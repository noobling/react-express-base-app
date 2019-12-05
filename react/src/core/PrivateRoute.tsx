import React, { ElementType, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../authService';

interface PrivateRouteProps {
  component: ElementType;
  path: string | string[];
  [key: string]: any;
}

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: PrivateRouteProps) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path]);

  if (!isAuthenticated) return null;

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
