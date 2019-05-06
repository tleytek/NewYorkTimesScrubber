import React from 'react';

const Articles = ({ searchedArticles }) => {
  const saveArticle = article => console.log(article);

  const renderArticleList = searchedArticles.map(article => {
    return (
      <div className="list-group-item" key={article._id}>
        <div className="row justify-content-between align-items-center">
          <div>{article.headline.main}</div>
          <button type="button" className="btn btn-primary" onClick={() => saveArticle(article)}>
            Save
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="card">
      <div className="card-header">Searced Articles</div>
      <ul className="list-group list-group-flush">{renderArticleList}</ul>
      <div />
    </div>
  );
};

export default Articles;