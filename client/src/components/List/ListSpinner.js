import React from 'react';

export const ListSpinner = () => (
  <div className="list-group-item beige">
    <div className="row justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);
