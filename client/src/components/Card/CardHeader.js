import React from 'react';

export const CardHeader = ({ children }) => {
  return (
    <div className="card-header pea-green">
      <h3>{children}</h3>
    </div>
  );
};
