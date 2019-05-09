import React from 'react';
import Spinner from '../components/Spinner';

class ArticlesCard extends React.Component {
  articleParityCheck = currentArticleUrl => {
    return this.props.savedArticles.find(savedArticle => {
      return savedArticle.url === currentArticleUrl;
    });
  };

  renderSearchedArticlesList() {
    return this.props.searchedArticles.map(article => {
      return (
        <div className="list-group-item" key={article._id}>
          <div className="row justify-content-between align-items-center">
            <a className="alert-link mx-2" href={article.web_url} rel="noopener noreferrer" target="_blank">
              {article.headline.main}
            </a>
            {this.articleParityCheck(article.web_url) ? (
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={() => this.props.saveArticle(article)}
                disabled
              >
                Saved
              </button>
            ) : (
              <button type="button" className="btn btn-primary mr-3" onClick={() => this.props.saveArticle(article)}>
                Save
              </button>
            )}
          </div>
        </div>
      );
    });
  }

  searchStatus() {
    if (this.props.searchState && this.props.searchedArticles.length === 0) {
      return <Spinner />;
    }
    if (this.props.searchState && this.props.searchedArticles.length > 0) {
      return <Spinner />;
    }
    if (!this.props.searchState && this.props.searchedArticles.length > 0) {
      return this.renderSearchedArticlesList();
    }
    return (
      <div className="list-group-item">
        <div className="row justify-content-center align-items-center">No Articles</div>
      </div>
    );
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">Searced Articles</div>
        <ul className="list-group list-group-flush">{this.searchStatus()}</ul>
        <div />
      </div>
    );
  }
}

export default ArticlesCard;
