import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {};

  handleSearchSubmit = () => {
    axios
      .get(
        'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=trump&sort=newest&api-key=lVRBW0XtJPMy11Wj30JPxxNonrgH64kH'
      )
      .then(response => {
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
