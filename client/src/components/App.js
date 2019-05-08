import React from 'react';
import API from '../utils/API';
import SearchCard from './SearchCard';
import Articles from './Articles';
class App extends React.Component {
  state = {
    articles: [],
    savedArticles: []
  };

  /* The onSearchSubmit function calls the searchArticles function and in 
   the promise we set the articles state to the response of searchArticles */
  onSearchSubmit = searchTerm => {
    API.searchArticles({ searchTerm }).then(response => this.setState({ articles: response.data }));
  };

  onSaveSubmit = article => {
    API.saveArticle({
      _id: article._id,
      title: article.headline.main,
      url: article.web_url
    });
  };

  render() {
    return (
      <div className="container">
        <SearchCard onSubmit={this.onSearchSubmit} />
        <Articles searchedArticles={this.state.articles} saveArticle={this.onSaveSubmit} />
      </div>
    );
  }
}

export default App;
