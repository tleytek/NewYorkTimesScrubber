import React from 'react';

export const FormButton = props => (
  <button {...props} className="btn orange">
    {props.children}
  </button>
);
