import React from 'react';
import Spinner from '../components/Spinner';

const SavedArticlesCard = ({ savedArticles }) => {
  const renderList = savedArticles.map(article => {
    return (
      <div className="list-group-item" key={article._id}>
        <div className="row justify-content-between align-items-center">
          <a className="alert-link mx-2" href={article.url} rel="noopener noreferrer" target="_blank">
            {article.title}
          </a>
        </div>
      </div>
    );
  });

  return (
    <div className="card my-3">
      <div className="card-header">Saved Articles</div>
      <ul className="list-group list-group-flush">{savedArticles.length > 0 ? renderList : <Spinner />}</ul>
    </div>
  );
};

export default SavedArticlesCard;
