import React from 'react';
import { ListButton } from '../List';
import './List.css';

export const ListItem = props => (
  <div className="list-group-item list-item-color">
    <div className="row justify-content-between align-items-center">
      <a className="alert-link mx-2" href={props.web_url}>
        {props.headline.main}
      </a>
      {props.articleParityCheck(props.web_url) ? (
        <ListButton className="btn btn-color mr-3" disabled>
          Saved
        </ListButton>
      ) : (
        <ListButton
          className="btn btn-color mr-3"
          onClick={() => props.saveArticle({ title: props.headline.main, url: props.web_url })}
        >
          Save
        </ListButton>
      )}
    </div>
  </div>
);
