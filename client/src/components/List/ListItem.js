import React from 'react';

export const ListItem = props => (
  <div className="list-group-item beige">
    <div className="row justify-content-between align-items-center">{props.children}</div>
  </div>
);
