import React from 'react';

export const Row = ({ justifyContent, children }) => (
  <div className={`row ${justifyContent ? 'justify-content-' + justifyContent : ''}`}>{children}</div>
);
