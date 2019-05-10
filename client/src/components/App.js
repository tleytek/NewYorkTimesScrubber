import React from 'react';
import API from '../utils/API';
import SearchCard from './SearchCard';
import ArticlesCard from './ArticlesCard';
import SavedArticlesCard from './SavedArticlesCard';
class App extends React.Component {
  state = {
    articles: [],
    savedArticles: [],
    searching: false
  };

  componentDidMount() {
    this.loadSavedArticles();
  }
  loadSavedArticles = () => {
    API.getSavedArticles().then(res => {
      this.setState({ savedArticles: res.data });
    });
  };

  deleteArticle = id => {
    API.deleteArticle(id).then(res => this.loadSavedArticles());
  };

  /* The onSearchSubmit function calls the searchArticles function and in 
   the promise we set the articles state to the response of searchArticles */
  onSearchSubmit = searchTerm => {
    this.setState({ searching: true });
    API.searchArticles({ searchTerm })
      .then(response => {
        console.log(response);
        this.setState({ articles: response.data, searching: false });
      })
      .catch(err => {
        this.setState({});
      });
  };

  onSaveSubmit = article => {
    API.saveArticle({
      title: article.headline.main,
      url: article.web_url
    }).then(this.loadSavedArticles());
  };

  render() {
    return (
      <div className="container">
        <SearchCard onSubmit={this.onSearchSubmit} />
        <ArticlesCard
          searchedArticles={this.state.articles}
          saveArticle={this.onSaveSubmit}
          savedArticles={this.state.savedArticles}
          searchState={this.state.searching}
        />
        <SavedArticlesCard savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
      </div>
    );
  }
}

export default App;
