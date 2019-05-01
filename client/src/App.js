import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {};

  handleSearchSubmit = () => {
    axios.get('/api/getArticles').then(response => {
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        Hello World
        <div>{this.handleSearchSubmit()}</div>
      </div>
    );
  }
}

export default App;
