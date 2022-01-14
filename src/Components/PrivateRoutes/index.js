import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../services/api';

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated() ? (
          <Component />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};
  
export const LoginRoute = ({ 
  component: Component,
  ...rest 
}) => (
  <Route
    {...rest}
    component={() =>
      isAuthenticated() ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component />
      )
    }
  />
);