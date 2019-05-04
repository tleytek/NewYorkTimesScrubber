import React from 'react';
import API from '../utils/API';
import SearchCard from './SearchCard';

class App extends React.Component {
  state = { articles: [] };

  /* The onSearchSubmit function calls the searchArticles function and in 
   the promise we set the articles state to the response of searchArticles */
  onSearchSubmit = searchTerm => {
    API.searchArticles({ searchTerm }).then(response => this.setState({ articles: response.data }));
  };

  render() {
    return (
      <div className="container">
        <SearchCard onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default App;
