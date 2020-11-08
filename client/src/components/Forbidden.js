import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Sorry! The page you are trying to reach is forbidden!</p>
    <Link className="button button-secondary" to="/">Return to List</Link>
  </div>
);