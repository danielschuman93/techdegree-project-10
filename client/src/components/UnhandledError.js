import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="bounds">
    <h1>Error</h1>
    <p>Sorry! There was an unexpected error!</p>
    <Link className="button button-secondary" to="/">Return to List</Link>
  </div>
);