import React from 'react';

export const ListButton = props => (
  // <div>
  //   {props.duplicatePrevention && props.duplicatePrevention(props.web_url)}
  // </div>
  <button {...props}>{props.children}</button>
);
