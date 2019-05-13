import React from 'react';
import './Input.css';

export const FormButton = props => (
  <button {...props} className="btn button-color">
    {props.children}
  </button>
);
