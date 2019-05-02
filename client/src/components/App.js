import React from 'react';
import axios from 'axios';
import SearchCard from './SearchCard';

class App extends React.Component {
  state = { articles: [] };

  // handleSearchSubmit = () => {
  //   axios.get('/api/getArticles').then(response => {
  //     console.log(response);
  //   });
  // };

  // ***LOOK INTO ERROR HANDLING HERE*** //
  onSearchSubmit = async searchTerm => {
    const response = await axios.get('/api/getArticles');

    this.setState({ articles: response });
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
