import React from 'react';

const Spinner = () => {
  return (
    <div className="list-group-item">
      <div className="row justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
