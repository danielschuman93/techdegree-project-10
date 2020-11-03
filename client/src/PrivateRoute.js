import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

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
                // state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};