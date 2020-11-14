import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// Component that wraps routes that require authorization to view.
// Checks to see if an authorized user is saved in state via context, if so render the component, else redirect to sign in page.
// If a user is redirected to sign in page, save the url they came from in state.
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};