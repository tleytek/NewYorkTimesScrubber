import React from 'react';

const Articles = ({ searchedArticles }) => {
  const articles = searchedArticles.map(article => {
    return console.log(article);
  });

  const articlesDisplay = searchedArticles.map(article => {
    return <li className="list-group-item">{article.headline.main}</li>;
  });

  return (
    <div className="card">
      <div className="card-header">Searced Articles</div>
      <ul className="list-group list-group-flush">{articlesDisplay}</ul>
      {articles}
    </div>
  );
};

export default Articles;
