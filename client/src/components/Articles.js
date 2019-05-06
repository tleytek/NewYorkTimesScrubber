import React from 'react';

const Articles = ({ searchedArticles }) => {
  const articles = searchedArticles.map(article => {
    return console.log(article);
  });

  const articlesDisplay = searchedArticles.map(article => {
    return (
      <div className="list-group-item">
        <div className="row justify-content-between align-items-center">
          <div>{article.headline.main}</div>
          <button type="button" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="card">
      <div className="card-header">Searced Articles</div>
      <ul className="list-group list-group-flush">{articlesDisplay}</ul>
      {articles}
      <div />
    </div>
  );
};

export default Articles;
