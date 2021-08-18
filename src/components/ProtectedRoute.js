// a higher order component which will protect the routes users shouldnt be able to access without logging in first
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// this component can take a component as a prop
// it can also recieve an infinite number of props to pass down
const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => {
          return props.isLoggedIn ? <Component { ...props } /> : <Redirect to='./signin' />
        }
      }
    </Route>
)}

export default ProtectedRoute;
