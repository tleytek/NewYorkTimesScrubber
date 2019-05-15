import React from 'react';
import Home from './components/Home';
import Saved from './components/Saved';
import { Jumbotron } from './components/Jumbotron';
import { Container } from './components/Grid';
const App = () => {
  return (
    <div>
      <Jumbotron />
      <Container>
        <Home />
        <Saved />
      </Container>
    </div>
  );
};

export default App;
