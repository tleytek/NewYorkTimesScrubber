import React from 'react';

export const ListLink = props => (
  <a className="alert-link mx-2" href={props.web_url}>
    {props.headline.main}
  </a>
);
