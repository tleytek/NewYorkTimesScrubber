import React from 'react';
import './Card.css';

export const CardHeader = ({ children }) => {
  return <div className="card-header header-color">{children}</div>;
};
