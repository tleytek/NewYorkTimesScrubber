import React from 'react';

export const Button = props => (
  <button {...props} className="btn btn-success">
    {props.children}
  </button>
);
